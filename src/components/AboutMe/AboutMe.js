import React from "react";
import "./AboutMe.css";
import studentPic from "../../images/avatar.jpeg";

function AboutMe(props) {
    return(
        <section className="student" id="about-student">
            <h2 className="student__title">Студент</h2>
            <div className="student__content">
                <div className="student__info">
                    <h3 className="student__name">Кумисжан</h3>
                    <p className="student__major">Фронтенд-разработчик, 32 года</p>
                    <p className="student__story">Я родилась в Казахстане, и сейчас живу в Ирландии, городе Дублин.
                     У меня есть муж и дочь. Я закончила бакалавриат по специальности
                     "Электротехника с концентрацией в Нанотехнологиях" в Бостонском Университетею
                     Также обучилась на магистратуре по специальности "Физика". На данный момент
                     прохожу онлайн курс по "Веб разработки" на Яндекс Практикум.</p>
                    <a href="https://github.com/dkumiszhan" target="_blank" className="student__github">Github</a>
                </div>
                <img className="student__pic" src={studentPic} alt="фото студента" />
            </div>
        </section>
    );
}

export default AboutMe;