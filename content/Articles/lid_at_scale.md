---
title: "Language Identification At Scale. Building a LID pipeline on 1TB for less than $30."
date: 2026-09-25T06:36:46+01:00
draft: true
math: true
cover:
    image: "diff_attn.png"
    alt: ''
tags: ['Modal', 'Pretraining', "AutoScalers", "Containers"]
Categories: ['Python','Software Engineering']
---

## Introduction

Language Identification is an important part of preprocessing data for pretraining or finetuning language models. We typically want to filter out data that includes languages we don't want to train on, or quantify precisely how much data we have on certain languages. 

Pretraining datasets tend to be multi-terabyte scale data typically derived from crawling web pages, books, news, and magazines etc. However this data must be cleaned for multiple reasons. Model performance is extremely dependent on the quality of data, the classic machine learning anecdotes still hold here. Ethical concerns such as alignment and model safety are also big concerns that underline the preprocessing stage.

Looking at the FineWeb dataset, consisting of 15 trillion tokens (or 44 Terabytes of text), created from an April 2024 [Common Crawl dataset](https://commoncrawl.org) -  A 386 TiB crawl of the entire internet. Given the sheer size of data, preprocessing at this scale is a serious feat of computation and infrastructure worth learning from, posing technical challenges from different angles. 

In this article I aim to share my lessons from running language identification on a 2TB dataset, exploring ideas from queue theory, autoscaling and job scheduling, a modal-powered stack, my experiments and their outcomes.


## Context 
The goal of this work is part of a larger effort to preprocess a really large collection of african language data, as part of an effort to train a performant language model on 80 african languages, the sabiyarn project. As is common in most pretraining runs, the preprocessing steps typically involve the following stages in order : 

- Data Provenance - who is responsible for what part of the dataset
- Language Identification - Identifying the language composition of the dataset.
- Deduplication - Removing duplicates
- Quality Filtering  - Removing bad data / harmful content
- Tokenization.


The goal is to perform language identification on the entire training corpus, consisting of 170+ repos, totaling just over 1TB of text, stored in a private HuggingFace Organization. Each of these repos consist of a non-uniform number of files and varying sizes.

## A little Maths

// Talk about queue theory, FIFO, LJF, Random, Graham (1996), Greedy Fixed Scheduling.

The simplest approach is to take the files(and not rows) as the smallest indivisible unit of work.

Formally, there are many ways of approaching this problem, one is as a scheduling problem, where we try to find the optimal schedule of files to execute, that gives us the shortest time to completion. My favorite howevers was to view it as a Queuing Problem. We have a queue consisting of thousand of files, each containing rows of text we want to identify. Our task is then to figure out how to efficiently distribute work over these files.

This class of problems are referred to as Deterministic Scheduling Problems in computer science, and our particular case is a subset of the Flexible [Job Shop Scheduling Problem](https://en.wikipedia.org/wiki/Job-shop_scheduling), and because we assume all of our machines (workers) are identical, and any task can run on any machine, this is precisely a [Identical parallel machine scheduling]() problem.



## Infra

// Kubernetes / Slurm / DataTrove / Modal


## Experimenting with a smaller sample


### Compute or I/O bound ?


## Estimating completion time


## Sharding and Autoscaling


## Shaving Cost

### How much memory do we really need though?


### insights from modal's Custom Container FileSystem



### Results


### Conclusion

