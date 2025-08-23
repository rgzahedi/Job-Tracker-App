import { Button } from '@/components/ui/button'
import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobs, deleteJob } from '../api'

const Applications = () => {

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    setLoading(true);
    getJobs()
      .then(data => {
        setJobs(data);
        setError(null); 
      })
      .catch(err => setError(err.message || 'Failed to fetch jobs'))
      .finally(() => setLoading(false)); 
  }, []);

  const uniqueStatuses = ['All', 'Applied', 'Interviewing', 'Rejected', 'Offer'];
  const filteredJobs = jobs.filter(job =>
    selectedStatus === 'All' || job.status === selectedStatus
  );

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Failed to delete job. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-70"></div>
        Loading Applications...
    </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-20 font-semibold">
        Error: {error}
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center mt-20 font-semibold text-gray-700">
        No applications found.
      </div>
    );
  }

  return (
    <>
      <section>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-4xl lg:text-6xl'>
          Job Applications
        </h1>
      </section>
      <div className='flex justify-center py-20'>
        <Link to='/add-job'>
          <Button variant='blue' size='xl'>Add Application</Button>
        </Link>
      </div>
      <div className="flex justify-center mt-8 mb-10">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border px-4 py-3 rounded text-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-500"
        >
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center'>
        <table className='w-3/4 table-auto'>
          <thead>
            <tr>
              <th className="px-6 py-3 text-center border border-gray-300 dark:border-gray-500">Company</th>
              <th className="px-6 py-3 text-center border border-gray-300 dark:border-gray-500">Job Title</th>
              <th className="px-6 py-3 text-center border border-gray-300 dark:border-gray-500">Status</th>
              <th className="px-6 py-3 text-center border border-gray-300 dark:border-gray-500">Date</th>
              <th className="px-6 py-3 text-center border border-gray-300 dark:border-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.map((job) => {
              return (
                <tr key={job.id}>
                  <th className="px-6 py-3 text-center border font-light border-gray-300 dark:border-gray-500">{job.company}</th>
                  <th className="px-6 py-3 text-center border font-light border-gray-300 dark:border-gray-500">{job.title}</th>
                  <th className="px-6 py-3 text-center border font-light border-gray-300 dark:border-gray-500">{job.status}</th>
                  <th className="px-6 py-3 text-center border font-light border-gray-300 dark:border-gray-500">{job.date}</th>
                  <th className="px-6 py-3 text-center border font-light border-gray-300 dark:border-gray-500">
                    <div className="flex justify-center gap-2">
                      <Link to={`/add-job/${job.id}`}>
                        <Button variant='blue' size='default'>Update</Button>
                      </Link>
                      <Button variant='destructive' size='default' onClick={() => handleDelete(job.id)}>
                        Delete
                      </Button>
                    </div>
                  </th>
                </tr>
              )
            }

            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Applications