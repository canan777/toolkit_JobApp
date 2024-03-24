import { useDispatch, useSelector } from 'react-redux';
import {
  setError,
  setJobs,
  setLoading,
} from '../redux/slices/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Filter from '../components/Filter';

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice);

  // api'dan verileri alıp store'a aktarır
  const fetchData = () => {
    // 1) yüklenme durumunu güncelle
    dispatch(setLoading());

    axios
      .get('http://localhost:4000/jobs')
      // 2) veriler gelirse store'a aktar
      .then((res) => dispatch(setJobs(res.data)))
      // 3) hata olursa store'u güncelle
      .catch((err) => dispatch(setError(err.message)));
  };

  // bileşen ekrana basıldığında fonk. çağır
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <Filter jobs={state.jobs} />

      {/* 
      1) Yüklenme Devam ediyorsa loader bas
      2) Yüklenme bittiyse ve hata varsa hata mesajı ve tekrar butonu bas
      3) Yüklenme bittiyse ve hata yoksa kartları ekrana bas
    */}

      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>
            Üzgünüz Verilere erişirken bir sorun oluştu
            <span>{state.isError}</span>
          </p>
          <button onClick={fetchData}>Tekrar Dene</button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;