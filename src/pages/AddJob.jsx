import { v4 } from 'uuid';
import { statusOpt, typeOpt } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from '../redux/slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // iş verilerini alma
  useEffect(() => {
    // 1) yüklenme durumunu güncelle
    dispatch(setLoading());

    axios
      .get('http://localhost:4000/jobs')
      // 2) veriler gelirse store'a aktar
      .then((res) => dispatch(setJobs(res.data)))
      // 3) hata olursa store'u güncelle
      .catch((err) => dispatch(setError(err.message)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki verilere erişme
    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());

    // tarih ve id ekle
    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();

    // api'a veriyi ekle
    axios
      .post('http://localhost:4000/jobs', newJob)
      // başarılı olursa store'a ekle
      .then(() => {
        toast.success('Yeni iş eklendi');
        dispatch(createJob(newJob));
        navigate('/');
      })
      // başarısız olursa uyarı ver
      .catch(() => {
        toast.warn('Ekleme işleminde sorun oluştu');
      });
  };

  // dizideki aynı elemanları kaldırır
  const removeDuplicates = (key) => {
    const arr = state.jobs.map((i) => i[key]);

    const filtred = arr.filter(
      (value, index) => arr.indexOf(value) === index
    );

    return filtred;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input
              list="positions"
              name="position"
              type="text"
              required
            />

            <datalist id="positions">
              {removeDuplicates('position').map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Şirket</label>
            <input
              list="companies"
              name="company"
              type="text"
              required
            />

            <datalist id="companies">
              {removeDuplicates('company').map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input
              list="locations"
              name="location"
              type="text"
              required
            />

            <datalist id="locations">
              {removeDuplicates('location').map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={''} hidden>
                Seçiniz
              </option>
              {statusOpt.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={''} hidden>
                Seçiniz
              </option>
              {typeOpt.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <div class="button-borders">
              <button class="primary-button">İş Ekle</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;