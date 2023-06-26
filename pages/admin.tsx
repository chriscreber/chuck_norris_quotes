// pages/admin.tsx
import React from 'react'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'
import type { GetServerSideProps } from 'next'
import { getSession } from '@auth0/nextjs-auth0'

type FormValues = {
  icon_url: string;
  value: string;
}

const CreateChuckNorrisPostMutation = gql`
  mutation($icon_url: String!, $value: String!) {
    create_chuck_norris_post(icon_url: $icon_url, value: $value) {
      icon_url
      value
    }
  }
`

const Admin = () => {
  const [create_chuck_norris_post, { data, loading, error }] = useMutation(CreateChuckNorrisPostMutation)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  console.log('process2');
  console.log(process);
  console.log(process.env);
  console.log(process.env.X_RAPIDAPI_KEY);
  console.log(process.env.X_RAPIDAPI_HOST);
  // Upload photo function
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return
    const file = e.target.files[0]
    const filename = encodeURIComponent(file.name)
    const res = await fetch(`/api/upload-image?file=${filename}`)
    const data = await res.json()
    const formData = new FormData()

    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value)
    })

    toast.promise(
      fetch(data.url, {
        method: 'POST',
        body: formData,
      }),
      {
        loading: 'Uploading...',
        success: 'Image successfully uploaded!🎉',
        error: `Upload failed 😥 Please try again ${error}`,
      },
    )
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const { title, url, category, description, image } = data
    console.log('In submit');
    const { icon_url, value } = data
    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${icon_url[0]?.name}`
    const variables = { icon_url: imageUrl, value }
    try {
      toast.promise(create_chuck_norris_post({ variables }), {
        loading: 'Creating new post..',
        success: 'Post successfully created!🎉',
        error: `Something went wrong 😥 Please try again -  ${error}`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const [message, setMessage] = useState('');

  const [updated, setUpdated] = useState(message);

  const handleChange = (event) => {
    console.log(event);
    setMessage(event.target.value);
  };

  const callChuckAPI = async () => {
    try {
      const res = await fetch(
        `https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random`,
        {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
              'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST
            },
        }
      );
      const data = await res.json();
      setMessage(data['value']);
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <Toaster />
      <h1 className="text-3xl font-medium my-5">Create a new quote</h1>
      <form className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
      <label className="block">
          <span className="text-gray-700">Upload a .png or .jpg image (max 1MB).</span>
          <input
            {...register('icon_url', { required: true })}
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
            name="icon_url"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            placeholder="Text"
            {...register('value', { required: true })}
            onChange={handleChange}
            name="value"
            type="text"
            value={message}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button 
            className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600" 
            type='button' 
            onClick={callChuckAPI}
          >
            Generate Joke
          </button>
        </label>

        <button
          disabled={loading}
          type="submit"
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Creating...
            </span>
          ) : (
            <span>Create Post</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default Admin

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    };
  }

  const user = await prisma.user.findUnique({
    select: {
      email: true,
      role: true,
    },
    where: {
      email: session.user.email,
    },
  });

  if (!user || user.role !== 'ADMIN') {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
