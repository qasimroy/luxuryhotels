import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useRequest from '@component/hooks/UseRequest';
import { apis } from '@component/apiendpoints/api';

function NewsLetterPopUp({ closeNewsLetter }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { request, response, loading } = useRequest(true);

  // Submit handler for the form
  const handleSubmitNewsLatter = (data) => {
    request('POST', apis.SUBSCRIBE_NEWSLATTER, data);
  };

  // Reset the form after a successful response
  useEffect(() => {
    if (response) {
      console.log('Response:', response);
      reset(); // Reset the form fields
    }
  }, [response, reset]);

  return (
    <div className="modal modal-newsletter d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
              <div className="newsletter-outerBox ">
                {/* Close Icon */}
                <button
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  onClick={closeNewsLetter}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h4 className="text-center newsletter-heading1">
                  NEWSLETTER
                </h4>
                <p className="newsletter-para1">
                  Subscribe to our newsletter to receive exclusive offers
                </p>

                <form
                  className="mx-auto mt-2 flex max-w-md gap-x-4"
                  onSubmit={handleSubmit(handleSubmitNewsLatter)}
                >
                  <label htmlFor="name" className="sr-only">
                    NAME
                  </label>
                  <input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="min-w-0 flex-auto rounded-md border border-gray-300 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="error_message">{errors.name.message}</span>}

                  <label htmlFor="email-address" className="sr-only">
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email-address"
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    className="min-w-0 flex-auto rounded-md border border-gray-300 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error_message">{errors.email.message}</span>}

                  <button
                    type="submit"
                    className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                    disabled={loading}
                    style={{ background: 'linear-gradient(to right, rgb(204, 164, 89), rgb(230, 205, 113), rgb(204, 163, 86))' }}
                  >
                    {loading ? 'Submitting...' : 'SUBSCRIBE'}
                  </button>
                </form>
              </div>
        </div>
      </div>
    </div>

  );
}

export default NewsLetterPopUp;
