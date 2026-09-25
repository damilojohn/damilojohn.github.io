---
title: "Super cheap Language Identification at scale. Building a LID pipeline at the 1TB scale for less than $30."
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

Language Identification is an important part of preprocessing data for pretraining or finetuning language models. We typically want to filter out data that includes languages we don't want to train on, or quantify precisely how much data we have on some languages. 

Pretraining datasets tend to be multi-terabyte scale data typically derived from crawling web pages, books, news, and magazines etc. However this data must be cleaned for multiple reasons. Model performance is extremely dependent on the quality of data, the classic machine learning anecdotes still hold here. Ethical concerns such as alignment and model safety are also big concerns that determine the preprocessing stage.

Looking at the FineWeb dataset consisting of 15 trillion tokens (or 44 Terabytes of text), created from the April,2024 ![Common Crawl dataset](https://commoncrawl.org) -  A 386 TiB crawl of the entire internet. Given the sheer size of data, preprocessing at this scale is an interesting computational challenge worth learning from, posing technical challenges from different angles. 

In this article I aim to share my lessons from running language identification on a 2TB dataset, exploring ideas from queue theory, autoscaling and job scheduling, a kubernetes-less stack, my experiments and their outcomes


##
