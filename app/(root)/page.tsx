import React from 'react'
import SearchForm from '@/components/SearchForm';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { SanityLive } from '../../sanity/lib/live';
import { auth } from '@/auth';

const page = async ({searchParams} : {searchParams: Promise<{ query?: string}>}) => {

  const query = (await searchParams).query;
  const params = { search: query || null }

  const session = await auth();

  console.log(session?.id)

  // const posts = await client.fetch(STARTUPS_QUERY);

  const {data: posts} = await sanityFetch({query : STARTUPS_QUERY, params})

  // console.log(JSON.stringify(posts, null, 2))
 
  return (
    <>

    <section className='w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6'>
      <h1 className='uppercase bg-black px-6 py-3 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5'>pitch your startup, <br /> connect with entrepreneurs </h1>
      <p className='text-center px-6 py-5 font-semibold max-w-7xl mx-auto text-white'>Submit Ideas, Vote on Pitches, and get Noticed in virtual competitions.</p>
      <SearchForm query = {query}/>
    </section>

    <section className='section_container'>
      <p className='text-30 font-semibold'>
        {
          query ? `Search results for "${query}"` : 'All Startups'
        }
      </p>
      <ul className='mt-7 card_grid'>
        {
          posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ): (
            <p className='no-result'>No startups found</p>
          )
        }
      </ul>
    </section>
    <SanityLive />
    </>
  )
}

export default page;