import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link' 
import Image from 'next/image'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author};

const StartupCard = ({post}: {post: StartupTypeCard}) => {
  const {_createdAt, views, author , title, category, _id, image, description} = post;

  return (
    <li className='group bg-white border-4 border-black py-6 px-5 rounded-xl shadow-[2px_2px_0px_2px_rgb(0,_0,_0)] hover:border-primary transition-all duration-500 hover:shadow-[2px_2px_0px_2px_rgb(238,_43,_105)] hover:bg-[#FFE8F0]'>
      
      <div className='flex justify-between'>

        <p className='startup_card_date'>
          {formatDate(_createdAt)}
        </p>

        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-[#EE2B69]'/>
          <span className='text-16-medium'>{views}</span>
        </div>

      </div>

      <div className='flex-1 mt-3'>
        <Link href={`/user/${author?._id}`}>
          <p className='font-medium line-clamp-1'>{author?.name}</p>
        </Link>

        <div className='flex justify-between mt-1'>
          <Link href={`/startups/${_id}`}>
            <h3 className='font-semibold line-clamp-1'>{title}</h3>
          </Link>
  
          <Link href={`/user/${author?._id}`}>
            <Image 
              src="https://placehold.co/600x400" 
              alt='placeholder' 
              width={48} 
              height={48} 
              className='rounded-full'
            />
          </Link>
        </div>
      </div>

      <Link href={`/startups/${_id}`}>
        <p className='font-normal text-[16px] line-clamp-2 my-2 text-[#333333] break-all'>{description}</p>
        <img src={image} alt='placeholder' className='startup-card_img'/>
      </Link>

      <div className='flex justify-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='font-medium'>{category}</p>
        </Link>
        <Button className='rounded-full bg-[#141413] font-medium text-[16px] text-white px-5 py-3' asChild>
          <Link href={`/startup/${_id}`}>details</Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard