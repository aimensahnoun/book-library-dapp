This is a project related to the [LimeAcademy](https://limeacademy.tech) trining. It is a book library dapp that allows the owner to add books, and for users to borrow and return books.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) ![Lines of code](https://img.shields.io/tokei/lines/github/aimensahnoun/book-library-dapp) ![GitHub top language](https://img.shields.io/github/languages/top/aimensahnoun/book-library-dapp)

## Addition of books
Adding the books is only an action that is allowed to the [`smart contract`](https://github.com/aimensahnoun/BookLibrary-hh) owner, and it is made simpler on the front-end side with a button and modal for entering the details of the book.

![Book Library Dapp](https://user-images.githubusercontent.com/62159014/203454237-22624b1f-e8d4-4867-96db-47bbae609778.png)
![Book Library | Add Book Modal](https://user-images.githubusercontent.com/62159014/203454259-e202b54e-894a-4797-b630-768b769c0439.png)

Any other user that is connected the app, would not be able to see or interact with the `add book` button.

## Borrowing and returning 
Users are able to `borrow` and `return` by a simple click of a button, after a transaction is signed they become the holders of the book , and the activity feed will show their transaction.

![Borrowing a book](https://user-images.githubusercontent.com/62159014/203454564-9da141cd-78a8-4899-aa41-c14e3870133f.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


```
#Alchemy API key for Polygon Mumbai
NEXT_PUBLIC_ALCHEMY_KEY=

#Smart contract address deployed onto Polygon Mumbai
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0xa165F07937B909b907B9A68438b73B651FE4D06D
```



## Run Locally

Clone the project

```bash
  git clone https://github.com/aimensahnoun/AimBridge
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install

  #or

  yarn instal
```

Start the server

```bash
  npm run dev

  #or

  yarn dev

```
