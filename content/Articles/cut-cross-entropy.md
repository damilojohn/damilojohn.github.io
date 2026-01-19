---
title: "Cut Cross Entropy: 20x Memory reduction in LLM training through optimized cross entropy kernels"
date: 2026-01-016T08:25:46+01:00
draft: false
cover:
    image: "diff_attn.png"
    alt: 'Cross Entropy'
tags: ['Transformers','Deep Learning', 'LLMs']
Categories: ['NLP']
---


# Introduction


2024 saw the first 100m$+ training runs, while the insane compute requirements of training Large Language Models is no secret, this jump brought more attention to the need to find tricks and methods to optimize both the transformers architecture and the training process (infrastructure).

The biggest / most successful of these optimizations in recent times has been flash attention (cite here), an idea that focuses on how the compute hungry (O(N)^2) self attention mechanism is computed, by moving attention matrices to SRAM. (Essentially the idea here is that we tried to optimize self attention by modifying how the operation is performed on the GPU.). The trend of squeezing out performance as much as possible from the training infrastructure continued, with researchers writing their own optimal cuda kernels. Deepseek took this a step further, writing their own distributed file system (Fire Flyer FileSystem), a new attention mechanism (MultiHead Latent Attention with custom kernels), a highly tuned communication library for mixture-of-experts models (Deep-EP), and Deep Gemm, an FP-8 optimized matrix multiplication kernel library.


However, looking beyond the model architecture and focusing on the training process, the cross entropy loss function has been often underlooked. Since language models essentially just autoregressively predict the next token, by sampling from a distribution (the token vocabulary), they can be thought of as classification models, with each class being a token in the model's vocabulary, and the the true value being the actual token in whatever dataset we are training on. 

## A bit on Cross Entropy

Cross Entropy originates from information theory, and is a function that measures the difference between distributions. In Machine Learning, the Cross Entropy Loss function is used in calculating the loss between the model's predicted probabilities and the true values. 


# LLM Training

As you already know, large language models are trained by autoregressively predicting the next token in a corpus, this corpus could vary from the entire internet and human literature in large scale pretraining, to smaller datasets on specific niches or domains(as in finetuning). Thus, an LLM autoregressively parameterizes a probability distribution over all possible tokens in it's vocabulary. This distribution is encoded in the weights of the model's architecture (Transformer Architecture), consisting of a backbone network (transformer layers) and a final classifier output layer. The output of the backbone network, popular known as embedding vectors, are fed as inputs to the classifier, which returns the probability distribution over all tokens in the models vocabulary. Like with every other classification problem in deep learning, we take the class with the highest predicted probability as the predicted class, in our case, the model's predicted token. This continues autoregressively, with the predicted token appended to the model's next input to predict the next token, and so on, looping through the entire training corpus.








