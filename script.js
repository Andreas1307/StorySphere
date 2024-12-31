// get the books
import { books, bestBook } from "./books.js";

const fBooks = document.querySelector(".fBooks");
const popularDiv = document.querySelector(".popular");
const body = document.querySelector("body");
const bBook = document.querySelector(".bBook");
const compareBtn = document.querySelector(".compareBtn");
const subscription = document.querySelector(".subscription");
const allBooks = document.querySelector(".allBooks");
const pBooks = document.querySelector(".purchasedBooks")
const notificationDiv = document.querySelector(".notification");
const cartSumDiv = document.querySelector(".order-summ");
const favBooksDiv = document.querySelector(".wishlist-list");
const errorDiv = document.querySelector(".error");
const accountDiv = document.querySelector(".account-div");
const signInDiv = document.querySelector(".signIn");
const signUpDiv = document.querySelector(".signUp");
const transferSignUp = document.querySelector(".create-acc");
const transferLogIn = document.querySelector(".logIn-acc");
const logInBtn = document.querySelector(".logIn");
const signUpBtn = document.querySelector(".signUpBtn");
const nameInput = document.querySelector(".nameInput");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const welcomeTitle = document.querySelector(".welcome");
const welcomeAcc = document.querySelector(".welcome-acc");
const email = document.querySelector(".email");
const memberSince = document.querySelector(".memberSince");
const changePassBtn = document.querySelector(".changePassBtn")
const changePassword = document.querySelector(".changePassword")
const showAccount = document.querySelector(".showAccount")
const closeAccount = document.querySelector(".closeAccount")
const ownedEbooksDiv = document.querySelector(".ownedBooks");
const purchaseBtn = document.querySelector(".download-btn");
const progressListDiv = document.querySelector(".progress-list")
const triggerCollap = document.querySelector(".triggerCollap")
const collapDiv = document.querySelector(".collapDiv");
const searchInput = document.querySelector(".search-input")
const searchOwnedBooks = document.querySelector(".searchOwned")
const searchAllBooks = document.querySelector(".searchAll");
const closeCollapBtn = document.getElementById("closeCollapBtn")
const menu = document.querySelector(".menu")
const collapBtn = document.querySelector(".collapBtn");
const priceText = document.querySelector(".price")
// Create a reusable overlay container
const overlayContainer = document.createElement("div");
overlayContainer.classList.add("overlay-container");
body.appendChild(overlayContainer);

// Array to track purchased books
 const purchasedBooks = [];
// Array to track down favorite books
const favoriteBooks = []
//Array to hold owned ebooks
let ownedEbooks = [];
//Array to track the customers details
const customerDetails = [];
// function to hold the read books
const readBooksArr = []
//Function for the responsive menu
collapBtn.addEventListener("click", () => {
    menu.classList.toggle("active")
})
closeCollapBtn.addEventListener("click", () => {
    menu.classList.remove("active")
})
triggerCollap.addEventListener("click", () => {
    collapDiv.classList.toggle("active")
})

// Array to track the progress of book reading
let trackProgress = ownedEbooks.map((book) => ({
    totalPages: book.chapters.length,  // Store total pages based on chapters
    pagesRead: 0,                     // Track pages read
}));


//Function to display the favroeiteBooks 
const showFavBooks = () => {
    if (favBooksDiv) {
        favBooksDiv.innerHTML = "";

        if (favoriteBooks.length === 0) {
            favBooksDiv.innerHTML = `<h5>You have not picked any of your favorite books</h5>`;
            return;
        }

        // Loop over favorite books to render them in the DOM
        favoriteBooks.forEach((book, index) => {
            const { title, img, author, price, indexNum } = book;
            favBooksDiv.innerHTML += ` 
                <div class="wishlist-item">
                    <img src="${img}" alt="${title}">
                    <div class="wishlist-details">
                        <h3>${title}</h3>
                        <p><strong>Author:</strong> ${author}</p>
                    </div>
                    <button data-index="${index}" class="btn wishlist-btn">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                    <button fav-index="${indexNum}" data-index="${index}" class="btn remove-btn">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>`;
        });

        favBooksDiv.addEventListener("click", (event) => {
            // Add to Cart button click
            if (event.target.closest(".wishlist-btn")) {
                const button = event.target.closest(".wishlist-btn");
                const index = button.getAttribute("data-index");
                const currentBook = favoriteBooks[index];
                const isBook = purchasedBooks.some(book => book.title === currentBook.title);


                if (isBook) {
                    errorNotification(currentBook.title, "cart");
                } else {
                    purchasedBooks.push({
                        title: currentBook.title,
                        img: currentBook.img,
                        author: currentBook.author,
                        price: currentBook.price,
                        date: dateFunc(),
                        number: index + 14312,
                        indexNum: currentBook.indexNum
                    });
                    console.log(purchasedBooks);

                    notification(currentBook.title, "cart");
                    showPBooks();
                    savePurchasedBooks();
                }
            }

            // Remove from favorites button click
            if (event.target.closest(".remove-btn")) {
                const button = event.target.closest(".remove-btn");
                const index = parseInt(button.getAttribute("data-index"), 10);

                // Ensure the index is valid and within bounds
                if (!isNaN(index) && index >= 0 && index < favoriteBooks.length) {
                    favoriteBooks.splice(index, 1); // Remove the book at the correct index
                    console.log(`Book at index ${index} removed successfully.`);
                    showFavBooks(); // Refresh favorites after removing
                } else {
                    console.log("Error: Invalid index for removal");
                }
            }
        }, { once: true }); // Ensure the event listener is not duplicated
    }
};


// Function to handle all the sing In and sign Up data
if(transferSignUp){
transferSignUp.addEventListener("click", () => {
    signInDiv.classList.remove("active")
    signUpDiv.classList.add("active")
})
}
if(transferLogIn){
transferLogIn.addEventListener("click", () => {
    signInDiv.classList.add("active")
    signUpDiv.classList.remove("active")
})
}
if(logInBtn) {
logInBtn.addEventListener("click", () => {
    accountDiv.style.display = "none"
})
}
if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
        // Clear the old data
        customerDetails.length = 0;

        // Add the new data
        customerDetails.push({
            name: nameInput.value,
            emailArr: emailInput.value,
            password: passwordInput.value,
            member: dateFunc(),
        });

        fillInfo();
        savePurchasedBooks()
        accountDiv.style.display = "none";
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
    });
}
if(showAccount) {
    showAccount.addEventListener("click", () => {
        accountDiv.style.display = "flex";
    })
}
if(closeAccount) {
    closeAccount.addEventListener("click", () => {
        accountDiv.style.display = "none";
    })
}
//all the change password logic
if(changePassBtn) {
    changePassBtn.addEventListener("click", () => {
        changePassword.classList.toggle("active")
    })
}
if(changePassword) {
    changePassword.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            changePassword.classList.remove("active")
        }
    })
}


//SearchBar for the user's books
const searchOwnBooks = (input, div, arr) => {
    const trimInput = input.value.trim().toLowerCase()
    div.innerHTML = "";

    if(trimInput) {
        const matchedBooks = arr.filter((book) => book.title.toLowerCase().includes(trimInput));
        if(matchedBooks.length > 0) {
            matchedBooks.forEach((ebook, index) => {
                const { title, author, img, indexNum } = ebook;
                    const ownedDiv = document.createElement('div');
                    ownedDiv.classList.add('ownedDiv');
                    ownedDiv.innerHTML = `
                        <img src="${img}" alt="${title}" />
                        <h3>${author}</h3>
                        <h2>${title}</h2>
                    `;
                    ownedDiv.addEventListener('click', () => displayBook(indexNum, index));
                    ownedEbooksDiv.appendChild(ownedDiv);
                
            });
        }
    } else {
        displayOwnedEbooks()
    }
}


if(searchOwnedBooks) {
    searchOwnedBooks.addEventListener("input", () => {
    searchOwnBooks(searchOwnedBooks, ownedEbooksDiv, ownedEbooks)
})
}

//logic and function to search all the books
if(searchAllBooks) {
    searchAllBooks.addEventListener("input", () => {
        searchAlBooks(searchAllBooks, allBooks, books)
    })
}
const searchAlBooks = (input, div, arr) => {
    const trimInput = input.value.trim().toLowerCase();
    div.innerHTML = "";

    if (trimInput) {
        const matchedBooks = arr.filter((book) => book.title.toLowerCase().includes(trimInput));
        if (matchedBooks.length > 0) {
            matchedBooks.forEach((book, index) => { // Corrected to use "book"
                const { title, img, price, genre } = book; // Use "book", not "ebook"
                div.innerHTML += `
                    <div class="book-item" data-index="${index}">
                        <img src="${img}" />
                        <p>${genre}</p>
                        <h3>${title}</h3>
                        <h4 class="text-danger">$${price}</h4>
                    </div>
                `;
            });
        } else {
            div.innerHTML = `<p>No matching books found</p>`;
        }
    } else {
        renderAllBooks();
    }
};

//Function to fill the customer's info
const fillInfo = () => {
    if (customerDetails.length > 0) {
        if(welcomeTitle) {
        const { name, emailArr, member } = customerDetails[0];
        welcomeTitle.textContent = name;
        welcomeAcc.textContent = name;
        email.textContent = emailArr;
        memberSince.textContent = member;
    }
}
};

 // Function to display the purchased books
 const showPBooks = () => {
    if (pBooks) {
        pBooks.innerHTML = '';
        cartSumDiv.innerHTML = "";
        if(purchasedBooks.length === 0) {
            pBooks.innerHTML = '<h5>You Have No Ebooks</h5>';
            cartSumDiv.innerHTML = "<h5>Your Cart is empty</h5>";  
        }
        let currentPrice = 0
        purchasedBooks.forEach((book, index) => {
            const { title, img, author, price, date, number } = book;
            const validPrice = parseFloat(price) || 0;
            pBooks.innerHTML += `
            <div class="purchased-book" data-index="${index}">
                <img src="${img}" />
                <p>${author}</p>
                <h2>${title}</h2>
                <span>
                <h3 class="text-danger">$${price}</h3>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </span>
                </div>
            `;
            cartSumDiv.innerHTML += `
            <p><strong>Ebook Title:</strong> ${title}</p>
            <p><strong>Order Number:</strong> #${number}</p>
            <p><strong>Added To Cart:</strong> ${date}</p> 
            <hr/>
            `
            currentPrice += validPrice
        });
        priceText.innerHTML = `$0   <span style="text-decoration: line-through; margin-right: -10px;">$${currentPrice}</span>`
        // Attach event listeners to the remove buttons
        document.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                removeBook(index, purchasedBooks);
            });
        });
    }
};

// Function to show the date
const dateFunc = () => {
    const date = new Date();

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

// Function to save the array to localStorage
const savePurchasedBooks = () => {
    localStorage.setItem("purchasedBooks", JSON.stringify(purchasedBooks));
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
    localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
    localStorage.setItem("ownedEbooks", JSON.stringify(ownedEbooks));
    localStorage.setItem("trackProgress", JSON.stringify(trackProgress))
    localStorage.setItem("readBooksArr", JSON.stringify(readBooksArr))
};
// Load purchasedBooks from localStorage
const loadPurchasedBooks = () => {
    const savedPurchasedBooks = localStorage.getItem("purchasedBooks");
    const savedFavoriteBooks = localStorage.getItem("favoriteBooks");
    const savedCustomerDetails = localStorage.getItem("customerDetails");
    const savedOwnedEbooks = localStorage.getItem("ownedEbooks");
    const savedTrackProgress = localStorage.getItem("trackProgress")
    const savedReadBooksArr = localStorage.getItem("readBooksArr")

    // Load purchasedBooks
    if (savedPurchasedBooks) {
        purchasedBooks.push(...JSON.parse(savedPurchasedBooks));
    }

    // Load favoriteBooks
    if (savedFavoriteBooks) {
        favoriteBooks.push(...JSON.parse(savedFavoriteBooks));
    }

    // Load customerDetails
    if (savedCustomerDetails) {
        customerDetails.push(...JSON.parse(savedCustomerDetails));
    }
    if (savedOwnedEbooks) {
        ownedEbooks.push(...JSON.parse(savedOwnedEbooks));
    }
    if (savedTrackProgress) {
        trackProgress.push(...JSON.parse(savedTrackProgress));
    }
    if (savedReadBooksArr) {
        readBooksArr.push(...JSON.parse(savedReadBooksArr));
    }
    // Populate the user info (if any) on page load
    fillInfo();
};

//Function to remove specified book from an array
const removeBook = (index, arr) => {
    arr.splice(index, 1);
    savePurchasedBooks();
    showPBooks();
    showFavBooks()
};
console.log(readBooksArr)
// Load the saved books when the script initializes
loadPurchasedBooks();
 showPBooks()
 showFavBooks()
 fillInfo()
// Initialize all event listeners
const initializeEvents = () => {
    if (compareBtn) {
        compareBtn.addEventListener("click", () => {
            compareBtn.style.display = "none";
            comparePlans();
        });
    }

    document.body.addEventListener("click", (event) => {
        const bookItem = event.target.closest(".book-item, .featured-item, .popular-item");
        if (bookItem) {
            const index = bookItem.getAttribute("data-index");
            bookDetails(index);
        }
    });
};
//function to display the notification
const notification = (title, text) => {
    notificationDiv.innerHTML = ""
    notificationDiv.innerHTML += `
     <h2><i class="fa-regular fa-circle-check"></i> ${title} was sucessfully added to ${text}</h2>
    `

   notificationDiv.classList.add("active")
    
   setTimeout(() => {
    notificationDiv.classList.remove("active")
   }, 2000)
}
//functon to display the error notification
const errorNotification = (title, text) => {
    errorDiv.innerHTML = "";
    errorDiv.innerHTML += `
     <h2><i class="fa-solid fa-triangle-exclamation"></i> ${title} is already in the ${text}</h2>
    `
    errorDiv.classList.add("active")

    setTimeout(() => {
        errorDiv.classList.remove("active")
    }, 3000)
} 
// Function to render all books
const renderAllBooks = () => {
if (allBooks) {
    books.forEach((book, index) => {
        const { title, img, price, genre } = book;
        allBooks.innerHTML += `
        <div class="book-item" data-index="${index}">
            <img src="${img}" />
            <p>${genre}</p>
            <h3>${title}</h3>
            <h4 class="text-danger">$${price}</h4>
        </div>
        `;
    });
}
}

// Function to compare plans
const comparePlans = () => {
    overlayContainer.innerHTML = `
    <div class="comparePlan">
        <span class="closePlan"><i class="fa-solid fa-xmark"></i></span>
        <div class="compare-plans">
            <h2>Compare Plans</h2>
            <table>
                <thead>
                    <tr>
                        <th>Features</th>
                        <th>Basic Plan<br><span>$9.99/month</span></th>
                        <th>Premium Plan<br><span>$19.99/month</span></th>
                        <th>Elite Plan<br><span>$29.99/month</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>eBook Access</td>
                        <td>5 books/month</td>
                        <td>Unlimited</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td>Audiobook Access</td>
                        <td>✖</td>
                        <td>✖</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td>Offline Reading</td>
                        <td>✖</td>
                        <td>2 devices</td>
                        <td>Unlimited devices</td>
                    </tr>
                    <tr>
                        <td>Personalized Recommendations</td>
                        <td>Limited</td>
                        <td>AI-powered</td>
                        <td>Enhanced AI</td>
                    </tr>
                    <tr>
                        <td>Exclusive Discounts</td>
                        <td>✖</td>
                        <td>✖</td>
                        <td>✓</td>
                    </tr>
                    <tr>
                        <td>Customer Support</td>
                        <td>Basic</td>
                        <td>Priority</td>
                        <td>Dedicated Manager</td>
                    </tr>
                    <tr>
                        <td>Free Trial</td>
                        <td>✓ (7 days)</td>
                        <td>✓ (7 days)</td>
                        <td>✓ (7 days)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `;
    overlayContainer.style.display = "block";

    // Close button for compare plans
    document.querySelector(".closePlan").addEventListener("click", () => {
        overlayContainer.style.display = "none";
    });
};
// Function to display featured books
const featuredBooks = () => {
    const featBooks = books.slice(0, 5);
    featBooks.forEach((el, index) => {
        const { title, img, price, author, genre } = el;
        if(fBooks) {
        fBooks.innerHTML += `
        <div class="featured-item" data-index="${index}">
            <img src="${img}" />
            <h2>${title}</h2>
            <span>
                <h4>${author}</h4>
                <h4>${genre}</h4>
            </span>
            <h3 class="text-danger">$${price}</h3>
        </div>
        `;
        }
    });
};
// Function to display popular books
const popularBooks = () => {
    const startIndex = 5;
    const popBooks = books.slice(startIndex, 13);
    popBooks.forEach((elem, index) => {
        const { title, img, price, genre } = elem;
        if(popularDiv){
        popularDiv.innerHTML += `
        <div class="popular-item" data-index="${index + startIndex}">
            <img src="${img}" />
            <p>${genre}</p>
            <h3>${title}</h3>
            <h4 class="text-danger">$${price}</h4>
        </div>
        `;
        }
    });
};
//function to add the books from the cart into the user's owned books
if (purchaseBtn) {
    purchaseBtn.addEventListener("click", () => {
        // Deduplicate by merging only new books into ownedEbooks
        purchasedBooks.forEach((book) => {
            if (!ownedEbooks.some((ownedBook) => ownedBook.title === book.title)) {
                ownedEbooks.push(book);
            }
        });

        notification("The books", "owned books");
        savePurchasedBooks();
        displayOwnedEbooks();
    });
}
//function to display the book content when the user clicks on it
const displayBook = (indexNum, index) => {
    const book = books[indexNum];
    const { title, img, author, genre, description, chapters } = book;
    let pageNum = 0

    const chaptersPage = (arr) => {
        return arr.map((chapter) => {
            const title = chapter.chapterTitle || "Untitled Chapter";
            return `
            <h2>${title}</h2>
            `
        }).join("")
    }
    // Dynamically render chapters
    const displayChapters = (arr) => {
        return arr
            .map((chapter) => {
                const title = chapter.chapterTitle || "Untitled Chapter";
                const content = chapter.content || "No content available.";
                pageNum += 1
                return `
                <div class="page">
                    <h2>${title}</h2>
                    <p>${content}</p>
                    <h3>${pageNum}</h3>
                </div>
                `;
                
            })
            .join("");

    };

    const readingDiv = document.createElement("div");
    const readingPage = document.createElement("div");
    const readingAccPage = document.createElement("div");
    readingPage.classList.add("readingPage");
    readingAccPage.classList.add("readingAccPage");
    readingDiv.classList.add("readingDiv");

    readingAccPage.innerHTML = `
    <div class="imgPage">
    <img src="${img}" />
    <h4>${description}</h4>
    <button class="bookRead">I have read this book</button>
    </div>
    <div class="chaptersPage">
    <h2>A book by ${author}</h2>
    </div>
    <div class="chaptersPage">
    <h1>Chapters</h1>
    ${chaptersPage(chapters)}
    </div>
    <div class="chaptersShow">
        ${displayChapters(chapters)}
    </div>
`;
readingDiv.innerHTML += `
<span class="closePage"><i class="fa-solid fa-xmark"></i></span>
`
    readingPage.appendChild(readingAccPage)
    readingDiv.appendChild(readingPage);
    body.appendChild(readingDiv);

   const bookRead = document.querySelector(".bookRead")

   bookRead.addEventListener("click", () => {
    readBooksArr.push({
        title: title,
        author: author,
        img: img
    })
    alert("This book has been added to you read books")
    readBooksFunc()
    savePurchasedBooks()
   })


    document.querySelector(".closePage").addEventListener("click", () => {
        readingDiv.remove()
    })
};
// function to display the user's read books

const readBooksFunc = () => {
    if (progressListDiv) {
        progressListDiv.innerHTML = ''; 

    readBooksArr.forEach((book) => {
        const { title, author, img } = book;
        const existingBook = Array.from(progressListDiv.children).find(
            (child) => child.querySelector('h3')?.textContent === title
        );
        if (!existingBook) {
            const progressItem = document.createElement('div');
            progressItem.classList.add('progress-item');
            progressItem.innerHTML = `
                <img src="${img}" alt="Book Cover">
                <div class="progress-details">
                    <h3>${title}</h3>
                    <p><strong>Author:</strong> ${author}</p>
                </div>
            `;

            progressListDiv.appendChild(progressItem);
        }
    })
}
}

readBooksFunc()



//function to display the owned books
const displayOwnedEbooks = () => {
    if (ownedEbooksDiv) {
        ownedEbooks.forEach((ebook, index) => {
            const { title, author, img, indexNum } = ebook;

            // Checking if the book already exists in the container
            const existingBook = Array.from(ownedEbooksDiv.children).find(
                (child) => child.querySelector('h2')?.textContent === title
            );

            if (!existingBook) {
                const ownedDiv = document.createElement('div');
                ownedDiv.classList.add('ownedDiv');
                ownedDiv.innerHTML = `
                    <img src="${img}" alt="${title}" />
                    <h3>${author}</h3>
                    <h2>${title}</h2>
                `;
                ownedDiv.addEventListener('click', () => displayBook(indexNum, index));
                ownedEbooksDiv.appendChild(ownedDiv);
            }
        });
    }
};
displayOwnedEbooks();



// Function to display book details
const bookDetails = (index) => {
    const book = books[index];
    const { title, img, price, author, description, genre } = book;
    overlayContainer.innerHTML = `
    <div class="book-details">
        <span class="x-icon"><i class="fa-solid fa-xmark"></i></span>
        <div class="details">
            <img src="${img}" />
            <div>
                <h1>${title}</h1>
                <h2>Author: <span>${author}</span></h2>
                <h3>Description: <span>${description}</span></h3>
                <h4>Genre: <span>${genre}</span></h4>
                <h5>Price: <span class="text-danger">$${price}</span></h5>
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0; margin: 0;">
                 <button class="pchsBtn">Add To Cart</button>
                <span class="favoriteBD-add"><i class="fa-solid fa-heart"></i></span>
                
                </div>
            </div>
        </div>
    </div>
    `;
    overlayContainer.style.display = "block";
    document.querySelector(".pchsBtn").addEventListener("click", () => {
        
        const isBook = purchasedBooks.some(bookIs => bookIs.title === book.title);

    if(isBook) {
        errorNotification(title, "cart")
        overlayContainer.style.display = "none";
    } else {
        purchasedBooks.push({
        title: title,
        img: img,
        author: author,
        description: description,
        genre: genre,
        price: price,
        date: dateFunc(),
        number: index + 14312,
        indexNum: index
        })
        overlayContainer.style.display = "none";
        notification(title, "cart")
        showPBooks()
        savePurchasedBooks();
    }
    })
    // Close button for book details
    document.querySelector(".x-icon").addEventListener("click", () => {
        overlayContainer.style.display = "none";
    });
    document.querySelector(".favoriteBD-add").addEventListener("click", () => {
        const isBook = favoriteBooks.some(bookIs => bookIs.title === book.title)

        if(isBook) {
            errorNotification(title, "favorites")
        } else {

        favoriteBooks.push({
            title: title,
            img: img,
            author: author,
            description: description,
            genre: genre,
            price: price,
            date: dateFunc(),
            number: 98 + 14312,
            indexNum: index
        })
        notification(title, "favorites")
        savePurchasedBooks()
        showFavBooks()
    }
    })
};


// Function to display best book
const bestBookFunc = () => {
    const index = books.length - 1;
    const { title, img, price, genre, author, description } = books[books.length - 1];
    if(bBook) {
    bBook.innerHTML = `
    <img src="${img}" />
    <div class="best-box">
        <h2>${title}</h2>
        <span>
            <h4>By <strong>${author}</strong></h4>
            <h4>in <strong>${genre}</strong></h4>
        </span> 
        <h3 class="text-danger">$${price}</h3>
        <p>${description}</p>
        <div class="box">
            <div>
                <button class="mBtn">-</button>
                <input class="cInput" type="number" value="1" min="1" />
                <button class="pBtn">+</button>
            </div>
            <span class="shop-cart"><i class="fa-solid fa-cart-shopping"></i></span>
            <span class="favorite-add"><i class="fa-solid fa-heart"></i></span>
            <span><i class="fa-solid fa-share-nodes"></i></span>
        </div>
    </div>
    `;

    document.querySelector(".shop-cart").addEventListener("click", () => {
        const quantity = parseInt(document.querySelector(".cInput").value) || 1;

        for (let i = 0; i < quantity; i++) {
        purchasedBooks.push({
            title: title,
            img: img,
            author: author,
            description: description,
            genre: genre,
            price: price,
            date: dateFunc(),
            number: 98 + 14312,
            indexNum: index
            })
        }
            overlayContainer.style.display = "none";
            notification(title, "cart")
            showPBooks()
            savePurchasedBooks();
    })

    document.querySelector(".favorite-add").addEventListener("click", () => {
        favoriteBooks.push({
            title: title,
            img: img,
            author: author,
            description: description,
            genre: genre,
            price: price,
            date: dateFunc(),
            number: 98 + 14312,
            indexNum: index
        })
        savePurchasedBooks()
        showFavBooks()
    })


    const mBtn = bBook.querySelector(".mBtn");
    const cInput = bBook.querySelector(".cInput");
    const pBtn = bBook.querySelector(".pBtn");

    mBtn.addEventListener("click", () => {
        if (cInput.value > 1) cInput.value--;
    });
    pBtn.addEventListener("click", () => {
        cInput.value++;
    });
}
};

bestBookFunc();
featuredBooks();
popularBooks();
initializeEvents();
savePurchasedBooks()
renderAllBooks()