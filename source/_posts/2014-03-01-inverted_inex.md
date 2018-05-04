---
layout: post
title: Ubuntu下配置Hadop(伪分布式）(2)-建立Hbase数据库与MapReduce生成倒排文件
category: study
tags: hadoop mapreduce hbase
---
## 任务

1. 按照如下方式写入2万条文献记录(hbase)：
	1. 在网上找一个2000个英文单词的词典。
	2. 将词典中每个单词在文献标题中总出现50次，每个单词在同一个文献标题中只出现一次，文献标题的长度在2-10 个单词之间。
	3. 每条文献的作者由词典中随机选择，2-3个单词组成。
	4. 指定50种会议或期刊名称，每条文献从中随机选择一种。
	5. 年份在1900-2014之间随机选择一个。
2. 采用MapReduce对HBase中文献的标题、作者等分别建立倒排文件。

<!-- more -->

## 建立HBase数据库

![](/images/hadoop/hbase.png "Title")

1. `paper` 表记录 paper 的所有信息，row为 Java 系统的纳秒时间。
2. `author` 表的存储设计为 row `papername: paperId = paperName`，其中row为 `authorName`，而 `papername: paperId`中的 `papername` 为列族，`paperId` 为相应paper在paper表中的rowKey，`paperName` 为paper的title。

以下是Java对hbase数据库的操作

```java
package cn.edu.nju.software.mr.util;

import java.io.IOException;

import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.KeyValue;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.MasterNotRunningException;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.ZooKeeperConnectionException;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HBaseAdmin;
import org.apache.hadoop.hbase.client.HConnection;
import org.apache.hadoop.hbase.client.HConnectionManager;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.util.Bytes;

public class TableUtil {
	public static Configuration conf = null;
	private static HConnection connection = null;
	static{
		conf=HBaseConfiguration.create();
		try {
			connection = HConnectionManager.createConnection(conf);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void createTable(String tablename, String[] familyname)
			throws IOException {
		HBaseAdmin hAdmin = new HBaseAdmin(conf);

		if (hAdmin.tableExists(tablename)) {
			System.out.println("表已经存在:"+tablename);
		}else{
			HTableDescriptor tableDes=new HTableDescriptor(TableName.valueOf(tablename));
			for(String family:familyname){
				tableDes.addFamily(new HColumnDescriptor(family));
			}
			hAdmin.createTable(tableDes);
			System.out.println("创建表成功:"+tablename);
		}
	}

	public static void deleteTable(String tablename) throws MasterNotRunningException, ZooKeeperConnectionException, IOException{
		HBaseAdmin hAdmin = new HBaseAdmin(conf);
		if (!hAdmin.tableExists(tablename)) {
			System.out.println("表bu存在:"+tablename);
		}else{
			hAdmin.disableTable(tablename);
			hAdmin.deleteTable(tablename);
			System.out.println("shanchu表成功:"+tablename);
		}
	}

	public static void putRow(String tablename,String rowkey,String columnFamily,String column,String value) throws IOException{

		HTableInterface hTable=connection.getTable(tablename);
		Put put=new Put(rowkey.getBytes());
		put.add(columnFamily.getBytes(), column.getBytes(), value.getBytes());
		hTable.put(put);
	}

	public static void getRow(String tablename, String row) throws IOException{
		HTableInterface hTable=connection.getTable(tablename);
	    Get get = new Get(Bytes.toBytes(row));
	    Result result = hTable.get(get);
        for (KeyValue rowKV : result.raw()) {
            System.out.print("Row Name: " + new String(rowKV.getRow()) + " ");
            System.out.print("Timestamp: " + rowKV.getTimestamp() + " ");
            System.out.print("column Family: " + new String(rowKV.getFamily()) + " ");
            System.out.print("Row Name:  " + new String(rowKV.getQualifier()) + " ");
            System.out.println("Value: " + new String(rowKV.getValue()) + " ");
        }
	}
}
```

## MapReduce建立倒排索引文件

以下代码是根据author对所有文献建立倒排索引文件。

最终的结果为：`Arabian	7419020838631#7386887151276#7416505788961#...`

这种形式，一个作者对应多个paper的rowkey。

```java
public class HBaseToFileByAuthor {
	public void execute() throws IOException, InterruptedException,
			ClassNotFoundException {
		Configuration config = HBaseConfiguration.create();
		Job job = new Job(config, "Author InvertedIndex");
		job.setJarByClass(HBaseToFileByPaper.class);

		Scan scan = new Scan();
		scan.setCaching(500);
		scan.setCacheBlocks(false);

		TableMapReduceUtil.initTableMapperJob("author", scan, PaperMapper.class,
				Text.class, Text.class, job);
		job.setReducerClass(PaperReducer.class);
		job.setNumReduceTasks(1);
		FileOutputFormat.setOutputPath(job, new Path(
				"hdfs://localhost:9000/result/author"));

		boolean b = job.waitForCompletion(true);
		if (!b) {
			throw new IOException("error with job!");
		}

	}

	public static class PaperMapper extends TableMapper<Text, Text> {

		private Text keyText = new Text();
		private Text valueText = new Text();

		public void map(ImmutableBytesWritable row, Result value,
				Context context) throws IOException, InterruptedException {
			String name = new String(value.getRow());
			valueText.set(name);

			//map task进行拆分
			String[] words = name.split(" ");
			for (String word : words) {
				keyText.set(word);
				System.out.println(word + ":" + name);
				context.write(keyText, valueText);
			}
		}
	}

	public static class PaperReducer extends Reducer<Text, Text, Text, Text> {
		private Text valueText = new Text();

		public void reduce(Text key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
			String all = null;
			//reduce task进行合并
			for (Text val : values) {
				if (all == null) {
					all = new String(val.getBytes());
					continue;
				}
				all = all + "#" + new String(val.getBytes());
			}
			valueText.set(all);
			context.write(key, valueText);
		}
	}

	public static void main(String args[]) {
		try {
			new HBaseToFileByAuthor().execute();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
```

### MapReduce研究

- 利用进入reduce之前数据是按照key排序的
- 复合key：count#AvgDate,复合key在很多情况下很好使用。

