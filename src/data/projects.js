// Every project's copy and numbers live here. The carousel card, the detail
// panel and the card artwork all read from this list. `glow` tints the
// violet bloom on each card.
export const PROJECTS = [
  {
    id: 'kario',
    glow: '#8f7cff',
    title: 'Kario',
    subtitle: 'Distributed job ingestion',
    metric: '200+',
    metricLabel: 'companies, live',
    stack: ['Python', 'FastAPI', 'Cloudflare Workers', 'PostgreSQL'],
    points: [
      'Custom connectors for 12+ ATS platforms (Greenhouse, Lever, Workday, Ashby and more) pull live postings from 200+ companies.',
      'Turns messy job descriptions into structured data, checked on every change by a pytest suite of labelled examples.',
      'Edge REST API on Cloudflare Workers keeps request CPU time under 10 ms by pushing filtering into SQL.'
    ],
    href: 'https://github.com/ShreySharma07/frshmen'
  },
  {
    id: 'karma',
    glow: '#b9a7ff',
    title: 'KARMA',
    subtitle: 'Automated code optimisation',
    metric: '8.99×',
    metricLabel: 'speedup, verified',
    stack: ['Python', 'FastAPI', 'Redis', 'CUDA'],
    points: [
      'A pipeline that writes, tests and benchmarks performance-critical code on its own, reaching up to 8.99× speedup.',
      'Caught a false 40× result, then built a four-stage testing harness that brought false positives to 0%.',
      'Caches build results in Redis so repeated work is never redone.'
    ],
    href: 'https://github.com/ShreySharma07/Multi-Agentic-CUDA-optimization'
  },
  {
    id: 'repliq',
    glow: '#a6e3ff',
    title: 'Repliq',
    subtitle: 'Secure workflow automation',
    metric: '20-step',
    metricLabel: 'Salesforce flow, end to end',
    stack: ['Python', 'FastAPI', 'Docker', 'OAuth 2.0'],
    points: [
      'A FastAPI service that turns a screen recording into a workflow it can replay.',
      'Real credentials stay in an encrypted vault; every task runs in its own isolated Docker container.',
      'Fixed a bug where the system reported success while the task had failed, by checking the real page state after every step.'
    ],
    href: 'https://github.com/ShreySharma07/salesforce-agent'
  },
  {
    id: 'fraud',
    glow: '#7c5cff',
    title: 'Fraud Detection',
    subtitle: 'Real-time scoring on AWS',
    metric: '97.7%',
    metricLabel: 'AUC at 1-in-100 fraud',
    stack: ['Python', 'AWS Lambda', 'SageMaker', 'CDK'],
    points: [
      'A serverless scoring service on Lambda and SageMaker, with all infrastructure defined in AWS CDK.',
      '97.7% AUC on 50K+ transactions where only 1 in 100 is fraud, with live predictions under 200 ms at p99.',
      'Retraining, validation and rolling deployments run through CI/CD with no downtime.'
    ],
    href: 'https://github.com/ShreySharma07/aws-realtime-fraud-detection'
  },
  {
    id: 'argus',
    glow: '#c7a8ff',
    title: 'Argus',
    subtitle: 'Agentic fraud investigation',
    metric: '590k',
    metricLabel: 'transactions in the graph',
    stack: ['TigerGraph', 'GraphRAG', 'MCP', 'React'],
    points: [
      'Investigates card-fraud alerts the way an analyst would, from a TigerGraph knowledge graph of 590k transactions and 5,565 closed cases.',
      'The graph sets the facts, deterministic code applies the bank’s policy, and the LLM weighs the evidence.',
      'Writes a suspicious-activity report when policy requires one, and saves every case back to the graph as memory.'
    ],
    href: 'https://github.com/ShreySharma07/Argus'
  },
  {
    id: 'llama',
    glow: '#9fb8ff',
    title: 'Math Llama 2',
    subtitle: 'QLoRA fine-tuning',
    metric: '−70%',
    metricLabel: 'GPU memory',
    stack: ['PyTorch', 'QLoRA', 'PEFT', 'Docker'],
    points: [
      'Fine-tuned Llama 2 on GSM8K for maths reasoning with QLoRA, PEFT and 8-bit quantisation.',
      'Cut the GPU memory footprint by 70%, so the model trains on hardware it otherwise would not fit.',
      'Shipped as a Dockerized inference pipeline on Hugging Face Spaces.'
    ],
    href: 'https://huggingface.co/ShreySharma07/maths-llama-qlora'
  }
];
