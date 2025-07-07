# AI Quantitative Trading Signal System

This is a Python-based quantitative trading signal system built using the LangChain framework. The system can obtain stock historical data and calculate various technical indicators.

## Features

- Input stock codes to obtain historical data.
- Fetch stock data using the yfinance API.
- Calculate multiple technical indicators (e.g., MACD, RSI, ATR).
- Support for the A-share market (Shanghai and Shenzhen).

## Prerequisites

- Python 3.12 or 3.13 must be installed locally and added to your system's PATH environment variable.
- An OpenAI API Key is required to run the `main.py` file successfully.

## Installation Instructions

1. Install dependency packages:

    ```bash
    python -m pip install -r requirements.txt
    ```

2. Create a `.env` file:

   Add your OpenAI API Key to the `.env` file. Example:

    ```
    OPEN_API_KEY=your_openai_api_key_here
    ```

## How to Use

Run the main program:

```bash
python main.py
```

Enter the stock code (e.g., `AAPL` for Apple, `600519` for Kweichow Moutai) to obtain relevant technical indicator data.
