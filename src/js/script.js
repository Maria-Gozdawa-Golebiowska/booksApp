{
  ('use strict');


  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    
    book: {
      image: '.books-list .book__image',
    },
  };
    
  const classes = {
    favorite: 'favorite',
  };
    
  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };

class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
  
      thisBooksList.initData();
      thisBooksList.determineRatingBgc();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData (){
      this.data = dataSource.books;
    }

    render() {
      const thisBookList = this;

      for (const book of dataSource.books) {
        
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.books(book);  
        const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.containerOf.booksList);
        booksContainer.appendChild(generateDOMElement);
      }
    }

    getElements() {
      const thisBooksList = this;
      
      thisBooksList.booksList = document.querySelector(select.containerOf.booksList);
      thisBooksList.form = document.querySelector(select.containerOf.filters);
      console.log(thisBooksList.filters);
    }
    

    initActions() {
      const thisBooksList = this;
      thisBooksList.booksList.addEventListener('dblclick',
        function (event) {

          const clickedBook = event.target.closest('a');
          event.preventDefault();

          let bookId = clickedBook.getAttribute('data-id');

          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            clickedBook.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(indexOfBook, 1);
            clickedBook.classList.remove('favorite');
          }
        }
      );

      thisBooksList.form.addEventListener('click', function (event) {

        if (
          event.target.tagName == 'INPUT' &&
          event.target.type == 'checkbox' &&
          event.target.name == 'filter'
        ) {
          console.log(event.target.value);
          if (event.target.checked) {
            thisBooksList.filters.push(event.target.value);
          } else {
            const indexOfFilters = thisBooksList.filters.indexOf(
              event.target.value
            );
            thisBooksList.filters.splice(indexOfFilters, 1);
          }
        }

        console.log('filters', thisBooksList.filters);
        thisBooksList.filterBooks();
      });
    }


    filterBooks() {
      const thisBooksList = this;

      for(let book of dataSource.books){
        let shouldBeHidden = false;  
        thisBooksList.Image = document.querySelector('.book__image[data-id="' + book.id + '"]');
        for (let filter of thisBooksList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }    
        }
        if (shouldBeHidden) {
        //document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
          thisBooksList.Image.classList.add('hidden');
        } else {
          thisBooksList.Image.classList.remove('hidden');
        }
      }
    }



determineRatingBgc(rating) {

  if (rating < 6) {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  } else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if (rating > 9) {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }

}
}

const app = new BooksList();
}
  
