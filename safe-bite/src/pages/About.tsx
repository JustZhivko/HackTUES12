import './About.css';

function About () {
    return (
        <section>
        <div className="about-page">
            <div className='about-title'>
                <h1>About us</h1>
            </div>
            <div className='description'>
                <div className='card'>
                <p className='text-desc'>
                    SafeBite е иновативно асистивно технологично решение, създадено с една цел — да даде на хората с увредено зрение пълна независимост при избора на храна.
                    
                    Много незрящи хора се сблъскват ежедневно с един привидно прост, но всъщност сериозен проблем: не могат да разберат дали храната пред тях е годна за консумация. Развалена ли е? Има ли мухъл? Какво изобщо е това? Въпроси, на които зрящият човек отговаря за секунди — но за незрящия изискват чужда помощ.

                    SafeBite решава този проблем чрез камера, монтирана на вградено устройство, което сканира храната в реално време. Системата използва разпознаване на изображения с изкуствен интелект, за да анализира хранителния продукт.

                    Резултатът се съобщава незабавно чрез гласова обратна връзка — просто, ясно и достъпно.

                    Придружаващият уебсайт дава допълнителна информация за сканираните продукти, история на проверките и настройки за персонализация.
                </p>
                </div>
            </div>
        </div>
        <div className='team-grid'>
                <div className='team card'>
                    <div className='card'>
                        <h2>Elitsa K.</h2>
                    </div>
                </div>

                <div className='team card'>
                    <div className='card'>
                        <h2>Zhivko U.</h2>
                    </div>
                </div>

                <div className='team card'>
                    <div className='card'>
                        <h2>Nikola Ch.</h2>
                    </div>
                </div>

                <div className='team card'>
                    <div className='card'>
                        <h2>Ivan I. (mentor)</h2>
                    </div>
                </div>
        </div>
        </section>
    )
}

export default About;