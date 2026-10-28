// Every project's copy and numbers live here: the home grid, the hover
// preview and the case-study pages all read from this list. Everything below
// comes from Shrey's resumes, repositories and the Argus write-up.
export const PROJECTS = [
  {
    id: 'kario',
    title: 'Kario',
    icon: 'briefcase',
    oneLiner: 'A distributed engine that pulls live job postings from 200+ companies and turns them into clean, structured data.',
    metric: '200+',
    metricLabel: 'companies ingested live',
    metricShort: 'companies, live',
    stack: ['Python', 'FastAPI', 'Cloudflare Workers', 'PostgreSQL', 'GitHub Actions'],
    href: 'https://github.com/ShreySharma07/frshmen',
    problem:
      'Job postings live behind a dozen different applicant-tracking systems, each with its own format. Turning them into something you can filter (experience range, batch eligibility, visa sponsorship) means reading messy free text reliably.',
    built: [
      'Custom connectors for 12+ ATS platforms, including Greenhouse, Lever, Workday and Ashby, pulling live postings from 200+ companies.',
      'A parser that turns messy job descriptions into structured fields, checked on every change by a pytest suite of labelled examples.',
      'An edge REST API on Cloudflare Workers with pooled PostgreSQL connections.',
      'CI/CD on GitHub Actions that discovers new companies, runs smoke tests and applies database migrations.'
    ],
    caught:
      'Edge workers have a tight CPU budget. Keeping requests under 10 ms meant pushing filtering down into SQL and de-duplicating postings by content hash, instead of doing the work in the worker.',
    result: 'Request CPU time stays under 10 ms, and every parsing change is checked against labelled examples before it ships.'
  },
  {
    id: 'karma',
    title: 'KARMA',
    icon: 'gauge',
    oneLiner: 'Five LLM agents that write, verify and benchmark GPU kernels, behind a harness built so a result can’t lie.',
    metric: '8.99×',
    metricLabel: 'speedup over PyTorch eager',
    metricShort: 'vs PyTorch eager',
    stack: ['Python', 'PyTorch', 'CUDA', 'ChromaDB', 'Redis', 'FastAPI'],
    href: 'https://github.com/ShreySharma07/Multi-Agentic-CUDA-optimization',
    problem:
      'LLMs can write fast GPU code, but they can also write code that only looks fast. A benchmark you can game is worse than no benchmark.',
    built: [
      'A five-agent pipeline: classifier → planner → coder → verifier → reflector.',
      'A RAG memory over ChromaDB that carries technique between tasks. One authored entry moved the agent from 0.26× to 1.09× on an identical task.',
      'Build results cached in Redis, so repeated work is never redone.',
      'Ablation studies on KernelBench (knowledge base, pre-flight profiling, reflection agent) toward a workshop paper.'
    ],
    caught:
      'The pipeline once reported a 40× speedup. It was false. I traced why and built a four-stage harness (compile → three-seed correctness → determinism gate → interleaved benchmarking) that structurally blocks reward hacking.',
    result: '8.99× over PyTorch eager and 1.08× over torch.compile on a consumer 6 GB GPU, with 0% false-positive correctness across every reported result.'
  },
  {
    id: 'repliq',
    title: 'Repliq',
    icon: 'workflow',
    oneLiner: 'Turns a screen recording into a workflow it can replay, without an agent ever holding a real secret.',
    metric: '20-step',
    metricLabel: 'Salesforce flow, end to end',
    metricShort: 'Salesforce flow',
    stack: ['Python', 'FastAPI', 'Docker', 'OAuth 2.0', 'MCP'],
    href: 'https://github.com/ShreySharma07/salesforce-agent',
    problem:
      'Automating a business workflow usually means scripting it by hand. Repliq learns it from a single recording instead, which means the agent acts on real systems, with real credentials.',
    built: [
      'A FastAPI service that turns a screen recording into a workflow, run by a reason–act–observe agent loop.',
      'An MCP-compatible tool layer with execution tracing, retries and error handling.',
      'Security by design: real credentials stay in an encrypted vault behind OAuth 2.0, and every task runs in its own isolated Docker container.'
    ],
    caught:
      'The system once reported success while the task had actually failed. I fixed it by checking the real page state after every step, so “done” means done.',
    result: 'It completes a 20-step Salesforce process end to end.'
  },
  {
    id: 'fraud',
    title: 'Fraud Detection',
    icon: 'shield',
    oneLiner: 'A serverless, real-time fraud scoring service on AWS, with every piece of infrastructure defined in code.',
    metric: '97.7%',
    metricLabel: 'AUC at 1-in-100 fraud',
    stack: ['Python', 'AWS Lambda', 'SageMaker', 'CDK', 'Step Functions', 'XGBoost'],
    href: 'https://github.com/ShreySharma07/aws-realtime-fraud-detection',
    problem:
      'Fraud is rare (here, 1 transaction in 100), so a model can look accurate while catching nothing, and a scoring service has to answer fast enough to sit in the payment path.',
    built: [
      'A scoring service on AWS Lambda and SageMaker, with all infrastructure defined in AWS CDK.',
      'A GenAI investigator that explains predictions, plus a human-in-the-loop feedback system.',
      'Automated retraining, validation and rolling deployments through CI/CD, with no downtime.'
    ],
    caught: null,
    result: '97.7% AUC on 50K+ transactions, with live predictions under 200 ms at p99.'
  },
  {
    id: 'argus',
    title: 'Argus',
    icon: 'eye',
    oneLiner: 'An agentic fraud investigator on a TigerGraph knowledge graph that knows when it isn’t sure, and asks.',
    metric: '590k',
    metricLabel: 'transactions in the graph',
    metricShort: 'transactions',
    stack: ['TigerGraph', 'GSQL', 'GraphRAG', 'MCP', 'FastAPI', 'React'],
    href: 'https://github.com/ShreySharma07/Argus',
    post: 'argus',
    context: 'TigerGraph Agentic Fraud Investigation challenge · Hacker House Goa 2026 · team',
    problem:
      'A fraud model’s score can’t tell a cloned card from a customer on holiday. An analyst answers that from the card’s history, its devices and other cards in the same region, then decides whether to act or ask first.',
    built: [
      'A TigerGraph knowledge graph of 590,742 transactions and 5,565 closed cases, queried through nine bounded GSQL queries.',
      'GraphRAG over the bank’s policy and 14 regulatory documents: vector plus BM25 search, fused and reranked.',
      'A split of duties: the graph sets the facts, deterministic code applies the policy, and the LLM judges what the evidence means.',
      'An agent that requests more evidence when unsure, re-assesses, and writes every case back to the graph as memory.'
    ],
    caught:
      'Generic device strings appear on hundreds of cards, so at first every card looked connected to fraud. Weighting shared devices by how rare they are (60 cards or fewer) fixed it.',
    result:
      'The agent requested evidence in 17 of 20 cases, and its recommendation changed in every one. Through the graph it found two fraud patterns that aren’t in the rulebook: a device ring and threshold probing.'
  },
  {
    id: 'llama',
    title: 'Math Llama 2',
    icon: 'sigma',
    oneLiner: 'Llama 2 fine-tuned on GSM8K for maths reasoning, made to fit where it otherwise wouldn’t.',
    metric: '−70%',
    metricLabel: 'GPU memory',
    stack: ['PyTorch', 'QLoRA', 'PEFT', 'TRL', 'Docker'],
    href: 'https://huggingface.co/ShreySharma07/maths-llama-qlora',
    problem: 'A full fine-tune of Llama 2 doesn’t fit on consumer hardware.',
    built: [
      'QLoRA with PEFT and 8-bit quantisation, training a low-rank update instead of the frozen weights.',
      'A Dockerized inference pipeline on Hugging Face Spaces: data prep, training, evaluation and deployment on one reproducible path.'
    ],
    caught: null,
    result: 'A 70% smaller GPU memory footprint and a training loss of 0.83.'
  }
];

export const projectById = id => PROJECTS.find(p => p.id === id);
