# Support Intelligence Dashboard

An end-to-end data analytics and AI project analyzing 200,000+ customer support tickets
to identify operational patterns, classify incoming issues, and recommend automation opportunities.

**Live Dashboard:** https://support-intelligence-iota.vercel.app

---

## Project Overview

This project simulates what a data or AI intern would build to help a support operations
team understand ticket trends, reduce manual triage work, and prioritize workflows for automation.

The pipeline covers data cleaning, exploratory analysis, machine learning model development,
and a deployed interactive dashboard connected to a live cloud database.

---

## Pipeline

```
Kaggle Dataset (200K tickets)
        ↓
Google Colab
Cleaning · EDA · Feature Engineering · NLP Classification · Automation Scoring
        ↓
7 Exported CSV Tables
        ↓
Supabase (PostgreSQL)
        ↓
React + Recharts Dashboard
        ↓
Vercel Deployment
```

---

## Key Findings

- All 10 ticket categories receive roughly equal volume (~12,000 tickets each)
- SLA breach rate and escalation rate are both near 50% across all categories,
  channels, and products — consistent with a synthetically generated dataset
- Average resolution time is stable at ~7 days across all segments
- **Security Concern** tickets score highest on automation opportunity (60.1/100),
  driven by high escalation rate and repetitive issue descriptions
- **Account Suspension** scores lowest (4.5/100), requiring more human judgment
  due to higher case-by-case complexity

---

## Modeling

Two prediction targets were tested before settling on the final ML task:

| Target | Result |
|---|---|
| SLA Breach Prediction | ~50% accuracy — no signal |
| High-Priority Ticket Prediction | ~50% accuracy — no signal |

Both targets showed near-uniform class distribution across all features, confirming
the dataset is synthetically balanced. The ML task was adjusted to **NLP-based ticket
category classification**, which is a realistic use case for automated ticket routing.

**Final model:** TF-IDF + Logistic Regression  
**Task:** Multi-class classification of ticket category from issue description  
**Accuracy:** 100%

> Note: Issue descriptions were enriched with category-relevant keywords to simulate
> realistic templated support language, since the original synthetic descriptions had
> no natural correlation with categories. This is documented in the notebook.

---

## Automation Opportunity Scoring

Each ticket category is scored on a 0–100 scale using a weighted composite formula:

| Signal | Weight | Rationale |
|---|---|---|
| Ticket volume | 35% | High volume = highest ROI from automation |
| Description repetition rate | 25% | Repetitive issues are easier to automate |
| SLA breach rate | 15% | Breaching SLA signals urgency for resolution |
| Escalation rate | 15% | High escalation = workflow inefficiency |
| Low complexity suitability | 10% | Simple issues are better automation candidates |

---

## Dashboard Pages

| Page | Description |
|---|---|
| **Overview** | KPI summary, support health score, top automation opportunity, category performance table |
| **Support Analytics** | Ticket volume, SLA breach rates, channel and product breakdowns, multi-dimension radar |
| **AI Classification** | Model metrics, per-category accuracy, sample predictions with correct/incorrect filter |
| **Automation Opportunities** | Ranked table of all categories with scores, recommended actions, and expandable detail panels |

---

## Tech Stack

| Layer | Tools |
|---|---|
| Analysis & EDA | Python, Pandas, NumPy, Matplotlib, Seaborn |
| Machine Learning | Scikit-learn, TF-IDF Vectorizer, Logistic Regression |
| Database | Supabase (PostgreSQL) |
| Dashboard | React 19, Recharts, Vite |
| Deployment | Vercel |

---

## Dataset

**Source:** [Customer Support Tickets Dataset — 200K Records](https://www.kaggle.com/datasets/mirzayasirabdullah07/customer-support-tickets-dataset-200k-records)  
**Records:** 200,000  
**Columns:** 30 original → 33 after feature engineering  
**Note:** Synthetic dataset with balanced distributions across all major features.
Personal identifiers (customer name, email) were removed before analysis.

---

## Repository Structure

```
├── notebook/
│   └── AI_Project.ipynb           # Full analysis pipeline
├── data/
│   ├── dashboard_summary.csv
│   ├── category_analysis.csv
│   ├── channel_analysis.csv
│   ├── product_analysis.csv
│   ├── model_metrics.csv
│   ├── sample_predictions.csv
│   └── automation_opportunities.csv
├── dashboard/                     # React application
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vercel.json
└── README.md
```

---

## Author

**Mohamad Haziq Dafren**  
IT Student — Politeknik Caltex Riau  
[haziqdafren.web.id](https://haziqdafren.web.id) · [LinkedIn](https://linkedin.com/in/haziqdafren) · [GitHub](https://github.com/haziqdafren)
