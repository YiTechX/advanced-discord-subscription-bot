# Discord Subscription Bot

A Discord bot that automatically assigns a subscriber role based on screenshots posted in a specific channel. This bot uses Tesseract.js for OCR (Optical Character Recognition) to detect if a user is subscribed to a specific YouTube channel.

## Features
- Automatically assigns a subscriber role to users who post a screenshot proving their subscription.
- Configurable YouTube channel name, target channel for screenshots, subscriber role, and log channel.
- Logs all actions in a specified log channel.

## Prerequisites
- Node.js (version 16.6.0 or higher)
- A Discord bot token
- Admin privileges on the Discord server to configure channels and roles

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/YiTechX/discord-subscription-bot.git
    cd discord-subscription-bot
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create and configure `config.json`:

    ```json
    {
        "token": "YOUR_BOT_TOKEN",
        "ytKanalAdi": "YourYouTubeChannelName",
        "kanal": "CHANNEL_ID",
        "aboneRolü": "ROLE_ID",
        "logKanal": "LOG_CHANNEL_ID"
    }
    ```
   - `YOUR_BOT_TOKEN`: Your Discord bot token.
   - `YourYouTubeChannelName`: The name of the YouTube channel to check subscriptions against.
   - `CHANNEL_ID`: The ID of the channel where users will post their subscription screenshots.
   - `ROLE_ID`: The ID of the role to assign to subscribed users.
   - `LOG_CHANNEL_ID`: The ID of the channel where logs will be posted.

4. Create an `images` directory in the project root to store screenshots temporarily:

    ```bash
    mkdir images
    ```

## Usage

Start the bot:

```bash
npm start
