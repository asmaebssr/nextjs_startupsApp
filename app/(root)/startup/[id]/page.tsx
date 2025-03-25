import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit();

export const experimental_ppr = true;
const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '')

  return (
    <>
    <section className='w-full bg-[#EE2B69] !min-h-[230] pattern flex justify-center items-center flex-col py-10 px-6'>
      <p className='bg-[#FBE843] px-6 py-3 font-bold rounded-sm uppercase relative'>{formatDate(post?._createdAt)}</p>
      <h1 className='uppercase bg-black px-6 py-3 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5'>{post.title}</h1>
      <p className='text-center px-6 py-5 font-semibold max-w-7xl mx-auto text-white'>{post.description}</p>
    </section>

    <section className='px-6 py-10 max-w-7xl mx-auto'>
      <img 
        src={post.image} 
        alt="tumbnail"
        className='w-full h-auto rounded-xl' 
      />

      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex justify-between gap-5'>
          <Link 
            href={`/user/${post.author?._id}`}
            className='flex gap-2 items-center mb-3'
            >
              <Image
                src={post.author.image}
                alt='avatar'
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />
              <div>
                <p className='text-[20px] font-medium'>{post.author.name}</p>
                <p className='font-medium'>@{post.author.username}</p>
              </div>
            </Link>

            <p className='category-tag'>{post.category}</p>
        </div>
        <h3 className='text-[30px] font-bold'>Pitch Details</h3>
        {
          parsedContent ? (
            <article 
              className='prose max-w-4xl break-all'
              dangerouslySetInnerHTML={{__html: parsedContent}}/>
          ) : (
            <p className='no-result'>No details provided</p>
          )
        }
      </div>
      <hr className='divider' />
    </section>
    <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3'/>}>
       <View id={id}/>
    </Suspense>
    </>
    )
}

export default page