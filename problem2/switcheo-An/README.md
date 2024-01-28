# Movie Web Application

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Source Tree](#source-tree)
- [Design Decisions](#design-decisions)
- [Technologies Used](#technologies-used)

## Description

Swap Token System is a web application that enables users to exchange their tokens. Users have the capability to connect their wallets and trade any of their available tokens. This README provides instructions on how to set up and use the application, discusses the design decisions, and outlines the testing approach.

## Prerequisites

Before setting up the Movie Web Application, ensure you have the following prerequisites in place:

- Node.js and npm installed on your development machine. You can download them from [https://nodejs.org/](https://nodejs.org/). (Recommend latest version 20.9.0)
- A code editor or Integrated Development Environment (IDE) for making any code changes, if required.

## Installation

Follow these steps to set up the test web application:

1. Download the compressed folder and unzip it

2. Open the the project in IDE

3. Install Dependencies: `npm install`

4. Start the Development: `npm start`

This command will start the development server and open the web application in your default web browser. The application should be available at http://localhost:8000.

## Source Tree

```
src/
├── __mocks__/
├── assets/
├── components/
├── constants/
├── hooks/
├── layout/
├── pages/
├── services/
├── styles/
├── types/
├── utils/
├── main.tsx
├── router.tsx
├── setupTests.tsx
```

## Design Decisions

Here are some key design decisions made during the development of the web application:

- **User-Friendly Interface:** The application provides a user-friendly interface with clear instructions, and error handling to ensure a seamless using process.

- **Modular Code Structure:** The codebase is structured with reusable components, making it easy to maintain and extend in the future.

- **Error Handling:** Errors are handled with user-friendly messages to guide users in case of input errors or failed when using.

## Usage

Once the Swap Token System web application is running, you can use it as follows:

1. Choose the token that you want to swap:

- On the web application's homepage, you will find an panel with 2 input fields

- The first input field is for your token that you want to trade and the second one is the token that you want to receive after trading

- You can click on the dropdown to change the token that you want to trade or receive

- You can use the input token name field to search the token you want.

2. Connect Wallet:

- Before trading you have to connect your wallet

- Click the "Connect Wallet" button to connect your wallet

3. Handling Errors:

- The application performs validation to ensure that the trade token and receive token are correctly formatted.

- If your balance is smaller than the token you want to trade, an error will be displayed

- If the swap is successful, you will receive a confirmation message.

- If any other errors occur, an alert will display the error message. (I fake the error for system when user want to trade **444** with any token)

## Technologies Used

- React
- Tailwind CSS
- Vite
- Storybook
- React testing library
- Zod
- React Query
