import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return(
        <section className="project" id="about-project">
            <h2 className="project__title">О проекте</h2>
            <div className="project__grid">
                <div className="project__table">
                    <p className="project__text">Дипломный проект включал 5 этапов</p>
                    <p className="project__text project__text_small">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="project__table">
                    <p className="project__text">На выполнение диплома ушло 5 недель</p>
                    <p className="project__text project__text_small">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__grid-progressbar">
                <p className="project__text-progress-complete">1 неделя</p>
                <p className="project__text-progress-incomplete">4 недели</p>
                <p className="project__text-grey">Back-end</p>
                <p className="project__text-grey">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;
