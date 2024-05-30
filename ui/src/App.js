import './App.css';
import { Navbar } from './Item/Navbar';
import { NoticeSlider } from './Item/NoticeSlider';

import './css/styles.css';

function App() {
  const noticeImages = [
    './images/course_1.jpg',
    './images/course_2.jpg',
    './images/course_3.jpg',
  ];

  return (
    <div className="App">
      <Navbar />

      <div className="notice-block" class = "notice-block">
        <h1>Thông báo mới</h1>
        <NoticeSlider images={noticeImages} />
      </div>
    </div>
  );
}

export default App;
