import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { createJob, updateJob, getJobById } from '../api'
import { useNavigate, useParams } from 'react-router-dom';

const AddJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { id } = useParams()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (id) {
  //     getJobById(id)
  //       .then((data) => {
  //         console.log('Job data from API:', data);
  //         reset({
  //           company: data.company,
  //           title: data.title,
  //           status: data.status,
  //           date: data.date,
  //         });
  //       })
  //       .catch((error) => {
  //         console.error('Failed to load job:', error);
  //       });
  //   }
  // }, [id, reset]);

  const onSubmit = async (formData) => {
    try {
      if (id) {
        setLoading(true);
        await updateJob(id, formData);
      } else {
        await createJob(formData);
      }
      navigate('/applications');
    } catch (error) {
      console.error('Failed to save job:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="text-lg text-gray-700 dark:text-gray-300 animate-pulse">Loading...</div>
      </div>
    );
  }


  return (
    <div>
      <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-4xl lg:text-6xl'>
        {id ? 'Edit Application' : 'Add an Application'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4 mt-8">
        <div className="w-full max-w-md">
          <Input
            placeholder="Company"
            {...register("company", { required: "Job title is required" })}
            className="w-full"
          />
          {errors.company && <p className='text-red-500 text-sm'>{errors.company.message}</p>}
        </div>

        <div className="w-full max-w-md">
          <Input
            placeholder="Job Title"
            {...register("title", { required: "Job title is required" })}
            className="w-full"
          />
          {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
        </div>

        <div className="w-full max-w-md">
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select status</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}
        </div>

        <div className="w-full max-w-md">
          <Input
            placeholder="Date Applied"
            {...register("date", { required: "Job title is required" })}
            className="w-full"
          />
          {errors.date && <p className='text-red-500 text-sm'>{errors.date.message}</p>}
        </div>

        <button
          type="save"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddJob;
