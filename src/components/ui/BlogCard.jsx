import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ title, created_at, image, slug }) => {
    return (
      <div className='shadow-xs md:shadow-md bg-white rounded-xl px-4 sm:px-5 pt-5 pb-4 border'>
        <Link className='rounded-md overflow-hidden' href={`/blogs/${slug}`}>
          <Image
            alt={title}
            loading='lazy'
            width={330}
            height={210}
            decoding='async'
            className='rounded-md w-full h-[220px] object-cover'
            src={`https://intercocina.com/storage/public/${image}`}
            style={{ color: 'transparent' }}
          />
        </Link>
        <div className='mt-5.5'>
          <span className='flex items-center gap-3 mb-2.5'>
            <a
              className='text-custom-sm ease-out duration-200 hover:text-blue'
              href='#'
            >
              {format(new Date(created_at), 'MMM dd, yyyy')}
            </a>
            <span className='block w-px h-4 bg-gray-300'></span>
            <a
              className='text-custom-sm ease-out duration-200 hover:text-blue'
              href='#'
            >
              INTERCOCINA
            </a>
          </span>
          <h3 className='font-bold text-dark text-md sm:text-xl ease-out duration-200 mb-4 hover:text-blue'>
            <a href={`/blogs/${slug}`}>{title}</a>
          </h3>
          <Link
            className='text-custom-sm text-sm md:text-base inline-flex items-center gap-2 py-2 ease-out duration-200 hover:text-blue'
            href={`/blogs/${slug}`}
          >
            Voir plus
            <svg width='18' height='18' viewBox='0 0 18 18' fill='currentColor'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.1023 4.10225C10.3219 3.88258 10.6781 3.88258 10.8977 4.10225L15.3977 8.60225C15.6174 8.82192 15.6174 9.17808 15.3977 9.39775L10.8977 13.8977C10.6781 14.1174 10.3219 14.1174 10.1023 13.8977C9.88258 13.6781 9.88258 13.3219 10.1023 13.1023L13.642 9.5625H3C2.68934 9.5625 2.4375 9.31066 2.4375 9C2.4375 8.68934 2.68934 8.4375 3 8.4375H13.642L10.1023 4.89775C9.88258 4.67808 9.88258 4.32192 10.1023 4.10225Z'
              />
            </svg>
          </Link>
        </div>
      </div>
    )
};

export default BlogCard;