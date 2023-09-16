import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
// import { Card } from 'flowbite-react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {

  return (
    // <div className="post">
    //   <div className="image">
    //     <Link to={`/post/${_id}`}>
    //       <img src={'http://localhost:4000/' + cover} alt="" />
    //     </Link>
    //   </div>
    //   <div className="texts">
    //     <Link to={`/post/${_id}`}>
    //       <h2>{title}</h2>
    //     </Link>
    //     <p className="info">
    //       <a className="author">{author.username}</a>
    //       <time>{formatISO9075(new Date(createdAt))}</time>
    //     </p>
    //     <p className="summary">{summary}</p>
    //   </div>
    // </div>
    <Card className="w-full max-w-[48rem] flex-row my-8 mx-5 md:mx-auto shadow-md">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={`http://localhost:4000/${cover}`}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex flex-col flex-grow">
        <div className="flex flex-col mb-auto">

          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            <a className="author">{author.username}</a>
          </Typography>

          <Typography color="gray" className="mb-4">
            <time>{formatISO9075(new Date(createdAt))}</time>
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {title}
          </Typography>



          <Typography color="gray" className="mb-8 font-normal">
            {summary}
          </Typography>

          <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className="mt-auto">
          <a href={`/post/${_id}`} className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </div>

      </CardBody>
    </Card>
  );
}