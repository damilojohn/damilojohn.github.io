---
title: "Handling Blocking Coroutines effectively in Asyncio"
date: 2024-12-11T04:14:46+01:00
draft: false
math: true
cover:
    image: "diff_attn.png"
    alt: ''
tags: ['Async', 'Python', "Coroutines"]
Categories: ['Python','Software Engineering']
---



## Introduction

I recently had to implement a feature at work that basically sent a ton of emails, with custom attachments to a ton of buyers across the world.
Since we had a broker, for placing mails on a queue that were picked and sent by workers, how architecture was already primed for asynchronous communication. However, on the client side, placing these emails asynchronously wasn't as simple. The main path between creating the mail and actually placing it on the service bus (broker), consisted mainly of blocking, CPU heavy tasks ; reading excel files, adding user information, serializing excel files to an in-memory buffer, base64 encoding these bytes and decoding them to strings, before finally creating the message json and sending it to the queue (this is non blocking). Implementing an efficient way of asychronously performing these operations was an interesting problem, keeping in mind python's GIL amongst the other limitations I mentioned earlier. I thought to write this blog post on my approach


