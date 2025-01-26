import React, { useEffect, useState } from 'react'
import Video from '../assets/Video.mp4';

const Home = () => {

  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        return response.json();
      })
      .then((data) => setBooks(data))
      .catch((error) => setError(error.message));
  }, []);


  return (
    <div className='home-container h-full'>
      <video src={Video} autoPlay loop muted />
    </div>
  );

  // return (
    // <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    //   <h1 className='underline' style={{ textAlign: 'center' }}>BACKEND UP AND RUNNING</h1>
    //   {error && (
    //     <div style={{ color: 'red', textAlign: 'center' }}>
    //       <strong>Error:</strong> {error}
    //     </div>
    //   )}
    //   {!error && books.length === 0 && (
    //     <div style={{ textAlign: 'center', marginTop: '20px' }}>
    //       Loading books...
    //     </div>
    //   )}
    //   <div
    //     style={{
    //       display: 'grid',
    //       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    //       gap: '20px',
    //       marginTop: '20px',
    //     }}
    //   >
    //     {books.map((book) => (
    //       <div
    //         key={book.id}
    //         style={{
    //           border: '1px solid #ccc',
    //           borderRadius: '8px',
    //           padding: '16px',
    //           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    //           backgroundColor: '#fff',
    //         }}
    //       >
    //         <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>
    //           {book.title}
    //         </h2>
    //         <p>
    //           <strong>Author:</strong> {book.author}
    //         </p>
    //         <p>
    //           <strong>Pages:</strong> {book.pages_num}
    //         </p>
    //         {book.review && (
    //           <p>
    //             <strong>Review:</strong> {book.review}
    //           </p>
    //         )}
    //       </div>
    //     ))}
    //   </div>
  // );
}

export default Home