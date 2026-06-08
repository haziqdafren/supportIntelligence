# Support Intelligence Dashboard

An end-to-end data analytics and AI project analyzing 200,000+ customer support tickets
to identify operational patterns, classify incoming issues, and recommend automation opportunities.

Live dashboard: [your-vercel-url]

---

## Project Overview

This project simulates what a data or AI intern would build to help a support operations
team understand ticket trends, reduce manual triage work, and prioritize workflows for automation.

The pipeline covers data cleaning, exploratory analysis, machine learning, and a deployed
interactive dashboard connected to a live database.

---

## Pipeline

```
Kaggle Dataset (200K tickets)
↓
Google Colab — cleaning, EDA, feature engineering, NLP classification, automation scoring
↓
Exported CSV tables (7 tables)
↓
Supabase PostgreSQL
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
- Security Concern tickets score highest on automation opportunity (60.1/100),
  driven by high escalation rate and repetitive descriptions
- Account Suspension scores lowest (4.5/100), requiring more human judgment

---

## Modeling

Two prediction targets were tested before settling on the final ML task:

**SLA Breach Prediction** — ~50% accuracy, no signal
**High-Priority Ticket Prediction** — ~50% accuracy, no signal

Both targets showed near-uniform distribution across all features, confirming the
dataset is synthetically balanced. The ML task was adjusted to NLP-based ticket
category classification, which is a realistic use case for automated ticket routing.

**Final model:** TF-IDF + Logistic Regression
**Task:** Classify ticket category from issue description
**Accuracy:** 100% (expected — issue descriptions were enriched with category-relevant
keywords to simulate realistic templated support language, since original descriptions
had no correlation with categories in the synthetic dataset)

---

## Automation Opportunity Scoring

Each category is scored on a 0–100 scale using a weighted formula:

| Signal | Weight |
|---|---|
| Ticket volume | 35% |
| Description repetition rate | 25% |
| SLA breach rate | 15% |
| Escalation rate | 15% |
| Low complexity suitability | 10% |

Higher scores indicate better candidates for chatbot, self-service, or workflow automation.

---

## Dashboard Pages

**Overview** — KPI summary cards and top automation opportunity
**Support Analytics** — ticket volume, SLA breach rate, channel and product breakdown
**AI Classification** — model performance, sample predictions, dataset context
**Automation Opportunities** — ranked table with recommended actions and business reasoning

---

## Tech Stack

| Layer | Tools |
|---|---|
| Analysis | Python, Pandas, NumPy, Matplotlib, Seaborn |
| Machine Learning | Scikit-learn, TF-IDF, Logistic Regression |
| Database | Supabase (PostgreSQL) |
| Dashboard | React, Recharts |
| Deployment | Vercel |

---

## Dataset

Source: [Customer Support Tickets Dataset — 200K Records](https://www.kaggle.com/datasets/mirzayasirabdullah07/customer-support-tickets-dataset-200k-records)
Records: 200,000
Columns: 30 original, 33 after feature engineering
Note: Synthetic dataset with balanced distributions across all major features.
Personal identifiers (customer name, email) removed before analysis.

---

## Repository Structure

```
├── notebook/
│   └── AI_Project.ipynb       # Full analysis pipeline
├── data/
│   ├── dashboard_summary.csv
│   ├── category_analysis.csv
│   ├── channel_analysis.csv
│   ├── product_analysis.csv
│   ├── model_metrics.csv
│   ├── sample_predictions.csv
│   └── automation_opportunities.csv
├── dashboard/
│   └── ...                    # React application
└── README.md
```

---

## Author

**Mohamad Haziq Dafren**
IT Student — Politeknik Caltex Riau
[haziqdafren.web.id](https://haziqdafren.web.id) · [LinkedIn](https://linkedin.com/in/haziqdafren)
