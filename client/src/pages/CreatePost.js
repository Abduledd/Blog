import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto md:py-0">
      <div class="text-center font-bold text-2xl m-5 text-gray-400 ">New Post</div>
      <form onSubmit={createNewPost}
        className="flex flex-col w-[97%] max-w-lg rounded-lg shadow bg-white p-3 mt-2" >
        <input type="title"
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none rounded"
          placeholder={'Title'}
          value={title}
          onChange={ev => setTitle(ev.target.value)} />
        <input type="summary"
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none rounded"
          placeholder={'Summary'}
          value={summary}
          onChange={ev => setSummary(ev.target.value)} />
        <input
          className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={ev => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Create post</button>

      </form>


    </div>

    // <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto md:py-0">
    //   <div class="heading text-center font-bold text-2xl m-5 pt-10 text-gray-500 ">New Post</div>

    //   <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    //     <input
    //       className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
    //       placeholder="Title"
    //       type="text"
    //       value={title}
    //       onChange={ev => setTitle(ev.target.value)}
    //     />
    //     <textarea
    //       className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
    //       spellCheck="false"
    //       placeholder="Describe everything about this post here"
    //       value={summary} // Assuming you want to use 'summary' for description
    //       onChange={ev => setSummary(ev.target.value)}
    //     ></textarea>

    //     {/* Icons */}
    //     <div class="icons flex text-gray-500 m-2">
    //       <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    //       <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    //       <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
    //       <div class="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
    //     </div>

    //     {/* Buttons */}
    //     <div class="buttons flex">
    //       <div class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
    //       <button
    //         type="submit"
    //         className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
    //         onClick={createNewPost}
    //       >
    //         Post
    //       </button>
    //     </div>
    //   </div>
    // </div>

  );
}