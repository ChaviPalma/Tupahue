'use client';

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./nosotros.module.css";

export default function NosotrosClient() {


    return (
        <div className={styles.pageContainer}>
            {/* Navbar */}
            <Navbar />

            {/* Banner */}
            <section
                className={styles.hero}
                style={{ backgroundImage: "url('/img/nosotros.jpeg')" }}
            >
            </section>

            {/* Misión y Visión */}
            <section className={styles.misionVisionSection}>
                <div className={styles.container}>
                    <h1 className={styles.mainTitle}>Quiénes somos</h1>

                    <div className={styles.contentBox}>
                        <p className={styles.textMuted}>
                            Personas que expresan la misma fe, reciben el mismo Señor, creen en su nombre y fueron
                            llamadas a hacer parte de La Iglesia Universal donde están todos aquellos que hacen la voluntad
                            del Padre.
                        </p>
                    </div>

                    <div className={styles.contentBox}>
                        <h5 className={styles.subtitle}>Visión</h5>
                        <p className={styles.textMuted}>
                            Ser una Iglesia compuesta por discípulos diversos que orientan integralmente su vida de
                            acuerdo con el evangelio, buscando ser el verdadero Jesús conocido en Puerto Montt y
                            alrededor del mundo para la gloria de Dios.
                        </p>
                    </div>

                    <div className={styles.contentBox}>
                        <h5 className={styles.subtitle}>Misión</h5>
                        <p className={styles.textMuted}>
                            La iglesia Tupahue existe para anunciar el evangelio en Puerto Montt y hasta el fin de la tierra, Uniéndonos a Dios en su propósito de Hacer nuevas todas las cosas a través de la
                            persona y obra de Jesús. Nos reunimos semanalmente para proclamar las buenas nuevas
                            del evangelio y responder en adoración, recordando la historia de
                            la redención, y renovando nuestro pacto con Dios.
                            Nos reunimos durante la semana, para reuniones de
                            oración, en casas, buscando vivir y anunciar el
                            evangelio.
                        </p>
                    </div>
                </div>
            </section>

            {/* Qué creemos */}
            <section className={styles.creenciasSection}>
                <div className={styles.container}>
                    <hr className={styles.divider} />
                    <h2 className={styles.sectionTitle}>Qué creemos</h2>

                    <div className={styles.contentBox}>
                        <h5 className={styles.subtitle}>Vemos la obra de Dios en conformidad con su eterno propósito</h5>
                        <p className={styles.textMuted}>
                            Todo lo que Dios Padre está haciendo en la historia, prepara una novia para su hijo Jesucristo,
                            y edifica una habitación para su espíritu, para que el pueblo de Dios viva para la alabanza de su gloria
                            y Cristo Jesús sea glorificado en ellos.
                        </p>

                        <h5 className={styles.subtitle}>Nos movemos de acuerdo con una perspectiva sacerdotal</h5>
                        <p className={styles.textMuted}>
                            La iglesia es un pueblo sacerdotal; nuestra misión es presentar la creación y el mundo delante de Dios
                            (para la gloria de Dios), delante de los santos (para la edificación de la iglesia) y delante del mundo
                            (para el bien del mundo).
                        </p>

                        <h5 className={styles.subtitle}>Priorizamos el evangelio</h5>
                        <p className={styles.textMuted}>
                            El evangelio es el glorioso anuncio de lo que Dios hizo por medio de la vida, muerte y resurrección de Jesús.
                            Queremos que todas las personas oigan, crean y sean transformadas por las buenas nuevas de Cristo.
                        </p>

                        <h5 className={styles.subtitle}>Comprometámonos con la comunidad</h5>
                        <p className={styles.textMuted}>
                            Somos salvados del aislamiento e insertados en una nueva comunidad conocida como el pueblo Redimido de Dios.
                            Demostramos el evangelio y declaramos lo que Cristo hizo cuando nos amamos como comunidad.
                        </p>

                        <h5 className={styles.subtitle}>Valoramos la cultura</h5>
                        <p className={styles.textMuted}>
                            Queremos estar intencionalmente presentes en nuestra ciudad para el bien de nuestro prójimo y para la gloria de Dios,
                            sin perder el poder de transformar vidas.
                        </p>

                        <h5 className={styles.subtitle}>Honramos la historia</h5>
                        <p className={styles.textMuted}>
                            Somos parte de un movimiento histórico de hombres y mujeres que buscaron a Dios con celo.
                            Priorizamos las liturgias antiguas y aprendemos del testimonio de quienes nos precedieron.
                        </p>

                        <h5 className={styles.subtitle}>Tenemos una Cosmovisión bíblica cristiana</h5>
                        <p className={styles.textMuted}>
                            Miramos toda la vida a través de las lentes del Evangelio. La meta narrativa de creación, caída, redención
                            y consumación nos muestra que todas las cosas fueron creadas por Dios, afectadas por el pecado y necesitan
                            ser redimidas a los pies de la cruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Declaración de fe */}
            <section className={styles.declaracionSection}>
                <div className={styles.container}>
                    <hr className={styles.divider} />

                    <div className={styles.declaracionCard}>
                        <div className={styles.declaracionBody}>
                            <h2 className={styles.declaracionTitle}>Iglesia Reformada Tupahue</h2>
                            <h2 className={styles.declaracionSubtitle}>Declaración de fe y fundamentos básicos</h2>

                            <h4 className={styles.sectionSubtitle}>I. Fundamentos básicos de la fe</h4>
                            <ol className={styles.orderedList}>
                                <li>Hay un Dios, existiendo eternamente en la Trinidad padre, hijo y Espíritu Santo.</li>
                                <li>Por amor, Dios envió su hijo Jesucristo para morir por nuestros pecados y resucitar de los muertos, para rescatar pecadores y redimir la creación.</li>
                                <li>Aquellos que confían en Cristo deben arrepentirse del pecado, confesar la fe y ser bautizados.</li>
                                <li>La iglesia es el cuerpo de Cristo en la tierra, con el poder del Espíritu Santo para continuar la tarea de alcanzarlos perdidos, discípula los salvos y reflejar el reino en misericordia, unidad y amor.</li>
                                <li>La salvación es un regalo gratuito de Dios. Tornando posible por la muerte y resurrección de Jesús y recibido por la fe.</li>
                                <li>La Biblia es la palabra inspirada de Dios y la autoridad final en la vida y en la doctrina.</li>
                                <li>Cuando muramos, seremos separados de Dios por el pecado o unidos a él eternamente por la fe en Cristo Jesús como nuestro señor y Salvador.</li>
                                <li>Cristo volverá un día, restaurará la creación y reinará para siempre.</li>
                            </ol>

                            <h4 className={styles.sectionSubtitle}>II. Declaración de fe</h4>
                            <ol className={styles.orderedList}>
                                <li><strong>El Dios trino:</strong> creemos en uno solo Dios, que existe eternamente en tres personas
                                    igualmente divinas: padre hijo y Espíritu Santo, que conocen aman y glorifican uno
                                    al otro. Este único Dios verdadero y vivo es infinitamente perfecto tanto en su amor
                                    cuanto en su santidad. Él es el creador de todas las cosas visibles y invisibles
                                    siendo así digno de recibir toda la gloria y adoración. Inmortal y eterno, él conoce
                                    perfectamente y exhaustivamente el fin desde el principio, sustenta y gobierna
                                    soberanamente todas las cosas y, en su providencia, promueve sus buenos
                                    propósitos eternos de redimir para así un pueblo y restaurar la creación caída, para
                                    la alabanza de su gloriosa gracia.</li>
                                <li><strong>Revelación:</strong> Dios graciosamente reveló su existencia y poder en la orden criada, y
                                    se ha revelado de manera suprema a los seres humanos caídos en la persona de
                                    su hijo, el verbo encarnado. Además, este Dios es un Dios que habla, por su
                                    espíritu graciosamente se reveló en palabras humanas: creemos que Dios inspiró
                                    las palabras preservadas en las escrituras, los 66 libros del antiguo y del nuevo
                                    testamento, los cuales documentan y son medio de su obra salvífico en el mundo.
                                    Solamente estos descritos constituyen la palabra de dios verbalmente inspirada, la
                                    cual, en los descritos originales, poseen autoridad suprema y está yenta de error,
                                    siendo también completa en la revelación de su voluntad para la salvación,
                                    suficiente para todo lo que Dios requiere que creamos y hagamos y final en su
                                    autoridad sobre todo el dominio del conocimiento que exprime. Confesamos que
                                    tanto nuestra finitud cuanto nuestra pecaminosos sea impide la posibilidad de
                                    conocer es exhaustivamente la verdad de Dios, más afirmamos que iluminados por
                                    el espíritu de Dios, podemos conocer verdaderamente la verdad revelada de Dios.
                                    La Biblia debe ser creída - como la instrucción de Dios - como peor de Dios - en
                                    todo lo que promete. La medida que el pueblo de Dios oye, cree y obedece a la
                                    palabra, él es equipado como la colectividad de discípulos de Cristo y testigos del
                                    evangelio.</li>
                                <li><strong>Creación de la humanidad:</strong> creemos que Dios creó a los seres humanos, macho y
                                    hembra, a su propia imagen. Adán y Eva pertenecían a la orden creada que el
                                    propio Dios declaró ser muy buena, sirviendo como agentes de Dios, cuidando,
                                    gerenciado y gobernando sobre la creación, viviendo en santa y dedicada
                                    comunión con su creador. Hombres y mujeres, igualmente creados a la imagen de
                                    Dios, gozan de igual acceso a Dios por la fe en Cristo Jesús y son llamados,
                                    ambos a que se muevan más allá de la auto indulgencia pasiva para un
                                    envolvimiento significante privado y público en la familia, iglesia y vida cívica. Adán
                                    y Eva fueron hechos para complementar el uno al otro en una unión de una sola
                                    carne, que establece el único padrón normativo de relaciones sexuales para
                                    hombres y mujeres, de manera que el matrimonio sirve como una tipificación de la
                                    unión entre Cristo y su iglesia. En los sabios propósitos de Dios, hombre y mujeres
                                    no son simplemente intercambiables, pero sí, se complementan de manera
                                    mutualmente enriquecedoras. Dios ordena que ellos asuman papeles distintos que
                                    reflejan es relacionamiento de amor entre Cristo y la iglesia, el marido ejerce papel
                                    de cabeza, de manera a demostrar el amor cariñoso y sacrificial de Cristo y la
                                    esposa se sometiendo a su esposo, de manera mostrar el amor de la iglesia por su
                                    señor. En el ministerio de la iglesia, ambos, hombres y mujeres, son animados a
                                    servir a Cristo y a desenvolver todo su pleno potencial en los múltiples ministerios
                                    del pueblo de Dios. El papel distinto de liderazgo dentro de la iglesia, que he dado
                                    a hombres calificados, es fundamentado en la creación, queda y redención, no
                                    vendo ser desviado por pelos a desenvolvimiento culturales.</li>
                                <li><strong>La caída:</strong> creemos que Adán, hecho a imagen de Dios, destorció esa imagen y
                                    perdió su bendición original - para así y toda su descendencia - al caer en pecado
                                    por la tentación de Satanás. Como resultado todo ser humano está llenado de
                                    Dios, corrompidos en todo aspecto de su ser (eso es, físicamente, mentalmente,
                                    volitiva amente, emocionalmente, espiritualmente) y condenados, final y
                                    irrevocablemente, a la muerte -a decir por la intervención graciosa del propio Dios.
                                    La necesidad suprema de todo ser humano es ser reconciliado al Dios bajo cuya
                                    santa y justa ira nos encontramos; la única esperanza de todo ser humano está en
                                    el amor y merecido de este mismo Dios, lo cual únicamente fue rescatarnos y
                                    restaurarnos para así.</li>
                                <li><strong>El plan de Dios:</strong>  creemos que desde toda la eternidad Dios determinó en su gracia,
                                    salvar una grande multitud de pecadores culpables, venidos de toda tribu, lengua y
                                    naciones, y con ese objetivo los conoció y eligió. Creemos que Dios justifica y
                                    santifica aquellos que, por su gracia, tienen fe en Jesús, y que un día él los
                                    glorificará - todo para la alabanza de su gloriosa gracia. En amor, Dios ordena y
                                    súplica que todas las personas se arrepientan y crean, teniendo puesto ese amor
                                    salvífico sobre aquellos que eligió y teniendo ordenado a Cristo como redentor de
                                    ellos.</li>
                                <li><strong>El evangelio:</strong> creemos que el evangelio es las buenas nuevas de Jesucristo - la
                                    propia sabiduría de Dios. Completa locura para el mundo, aún aunque sea el poder
                                    de Dios para aquellos que están siendo salvados, esas buenas nuevas son crist
                                    lógicas, centradas en la cruz y en la resurrección: el Evangelio no es proclamado si
                                    Cristo no es proclamado, y el Cristo auténtico no tendrá sido proclamado si su
                                    muerte y resurrección no fueran centrales (el mensaje es: Cristo murió por nuestros
                                    pecados… y resucitó). Esa buena nueva es bíblica (su muerte y resurrección son
                                    de acuerdo con las escrituras), teológica y salvífico (Cristo murió por nuestros
                                    pecados para reconciliarnos con Dios), histórica (si los eventos salvadores no
                                    hubieran acontecido, nuestra fe sería Habana, aún estaríamos en nuestros pecados
                                    y seríamos, de todos los hombres, los más díganos de compasión), apostólica (el
                                    mensaje fue confiado a los apóstoles y transmitido por ellos que eran testigos de
                                    esos eventos salvífico) y intencionalmente personal (cuando ella es recibida, creída
                                    y firmemente retenida, personas son individualmente salvadas).</li>
                                <li><strong>Retención de Cristo:</strong> creemos que, movido por el amor y en obediencia al padre el
                                    hijo eterno se hizo hombre, el verbo se encarnó, plenamente Dios y plenamente
                                    humano, una persona en dos naturaleza. El hombre Jesús, el mesías prometido de
                                    Israel, fue concebido por la milagrosa actuación del Espíritu Santo y Nació de la
                                    virgen María. El obedeció perfectamente la voluntad del padre celestial, vivió una
                                    vida sin pecado, realizó señales y milagros, fue crucificado soponcio Pilatos,
                                    resucitó corporalmente de la muerte al tercer día y ascendió a los cielos. Como rey
                                    mediador, él está sentado a la diestra de Dios padre, ejerciendo en el cielo y en la
                                    tierra toda la soberanía de Dios, y nuestro sumo sacerdote y justo abogado.
                                    Creemos que por su Encarnación, vida, muerte, resurrección y Ascensión,
                                    Jesucristo actuó como nuestro representante y sustituto. Él lo hizo para que en él
                                    fuéramos hechos justicia de Dios: en la cruz él canceló el pecado, propició a Dios
                                    y, cargando toda la penalidad de nuestros pecados, reconcilió con Dios todos los
                                    que creen. Por su resurrección, Cristo Jesús fue vindicado por su padre, rompió el
                                    poder de la muerte y venció Satanás, que anteriormente tenía poder sobre ella, y
                                    trajo vida eterna a todo su pueblo; por su ascensión, él fue para siempre es saltado
                                    como señor y nos preparó un lugar para estarnos junto de él. Creemos que la
                                    salvación no está en ningún otro, por qué no hay ningún otro nombre dado bajo el
                                    cielo por lo cual seamos salvados. Porque Dios eligió las cosas humildes de este
                                    mundo, las despreciadas, las cosas que no son, para anular las cosas que son,
                                    ningún ser humano podrá van gloriarse día antes de él - Cristo Jesús se hizo para
                                    nosotros sabiduría de Dios, o sea nuestra justicia, rectitud y santidad y redención.</li>
                                <li><strong>La justificación de pecadores:</strong>  creemos que Cristo, por su obediencia y muerte
                                    pagó completamente la deuda de todos aquellos que son por el justificados. Por
                                    su sacrificio como él cargó en nuestro lugar el castigo que era debido por nuestros
                                    pecados, satisfaciendo plenamente la justicia de Dios por nosotros. Por su perfecta
                                    obediencia, el satisfizo las justas exigencias de Dios en nuestro favor, una vez que,
                                    por la fe solamente, esa perfecto obediencia es acreditada a todos los que confía
                                    en un exclusivamente en Cristo para hacer acepto delante de Dios. Por la voluntad
                                    de Dios, y no por alguna cosa que hubiera en nosotros, Cristo fue dado en nuestro
                                    favor, y su obediencia y castigo fueron acepto en el lugar de nuestra obediencia y
                                    castigo. Esta justificación es solamente por la gracia, a fin de qué tanto la exacta
                                    justicia cuanto la rica gracia de Dios sean glorificadas en la justificación de los
                                    pecadores. Creemos que el celo por la obediencia personal y pública fluye de esa
                                    justificación graciosa.</li>
                                <li><strong>El poder del Espíritu Santo:</strong> creemos que esa salvación, atestada en toda la
                                    escritura y asegurada por Jesucristo, es aplicada a su pueblo por el Espíritu Santo.
                                    Enviado por el padre y por el hijo, el Espíritu Santo glorifica el señor Jesucristo y,
                                    como otro para Cleto, está presente en y con aquellos que creen. Él convence el
                                    mundo del pecado, de la justicia y del juicio y, por su obra poderosa y misteriosa,
                                    regenera pecadores espiritualmente muertos, despertándose para el
                                    arrepentimiento y la fe; en él son bautizados en unión con el señor Jesús, de
                                    manera que son justificados delante de Dios solamente por la gracia y por la fe, en
                                    Jesús Cristo. Por obra del Espíritu Santo, los creyentes son renovados,
                                    santificados y adoptados en la familia de Dios, participan de la naturaleza divina y
                                    reciben sus dones qué son soberanamente distribuidos. El propio Espíritu Santo es
                                    el peor de la herencia prometida y, en esta presente era, habita, dirige, guía,
                                    instruye, equipa, Renova y capacita los creyentes para vivieren y sirvieren como
                                    Cristo.</li>
                                <li><strong>El reino de Dios:</strong> creemos que aquellos que fueron salvados por la gracia de Dios
                                    mediante la unión con Cristo, por la fe y por la regeneración del Espíritu Santo,
                                    entran en el reino de Dios y disfrutan de las bendiciones de la nueva alianza: el
                                    perdón de los pecados, la transformación interior - que despierta un deseo por
                                    glorificar, confiar y obedecer a Dios - y la expectativa de gloria que aún será
                                    revelada. Las buenas obras constituyen evidencias indispensables de la gracia
                                    salvadora. Viviendo como sal en un mundo que se deteriora y luz en un mundo
                                    oscuro, los creyentes jamás deberán abastase en reclusión del mundo, ni tornarse
                                    indistinguibles de él; por lo contrario como debemos hacer el bien a la ciudad, para
                                    que la gloria y honra de las naciones sean ofrecidas al Dios vivo. En
                                    reconocimiento a quién pertenece esta orden creada y porque somos ciudadanos
                                    del reino de Dios, debemos amar nuestro prójimo como amamos a nosotros
                                    mismos, haciendo el bien a todos, especialmente a los que pertenecen a la familia
                                    de Dios. El reino de Dios - presente, pero aún no plenamente consumado - es el
                                    ejercicio de la soberanía de Dios en el mundo en dirección a la eventual redención
                                    de toda la creación. El reino de Dios es un poder que invade y despoja el tenebroso
                                    reino de Satanás, regenerando y renovando, mediante arrepentimiento y fe, la vida
                                    de los individuos rescatados de aquel reino. Por lo tanto, el inevitablemente
                                    establece una nueva comunidad de seres humanos que están juntos debajo de
                                    Dios.</li>
                                <li><strong>El nuevo pueblo de Dios:</strong> creemos que el pueblo de la nueva alianza de Dios ya
                                    vino a Jerusalén celestial; ya está sentado con Cristo en los lugares celestiales. Esa
                                    iglesia universal se manifiesta en iglesias locales de las cuales Cristo es la única
                                    cabeza; así, cada iglesia local es, de facto, la iglesia, la casa de Dios, la asamblea
                                    del Dios vivo, columna y fundamento de la verdad. La iglesia es el cuerpo de
                                    Cristo, la niña de sus ojos, está grabada entre sus manos, y él se comprometió con
                                    ella para siempre. La iglesia es distinguida por el mensaje del Evangelio, sus
                                    sagradas ordenanzas, su disciplina, su gran misión y, arriba de todo, por su amor a
                                    Dios y por amor de sus miembros unos por los otros y por el mundo. De modo
                                    crucial, el evangelio que amamos posee dimensiones personales y también
                                    corporativas, siendo que ninguna de ellas debe ser ignorada. Cristo Jesús es
                                    nuestra paz: él no solamente trajo paz con Dios, como también paz entre pueblos
                                    antes alienados. Su propósito para crear en ti una nueva humanidad, haciendo la
                                    paz, y reconciliando ambos en un solo cuerpo con Dios, por intermedio de la cruz,
                                    destruyendo por ella la intimista. La iglesia sirve de señal del futuro nuevo mundo
                                    de Dios, cuando sus miembros viven en servicio los unos por los otros y por el
                                    prójimo, en vez de vivieran enfocados en sí mismos. La iglesia es la habitación
                                    corporativa del espíritu de Dios y el testigo continuo de Dios en el mundo.</li>
                                <li><strong>Bautismo y cena del Señor:</strong> creemos que el bautismo y la cena del
                                    señor son ordenados por el propio señor Jesús. El primer está ligado a la entrada
                                    en la comunidad de la nueva alianza y el segundo, a la renovación continua de la
                                    alianza. Juntos son simultáneamente el peor de Dios hacia nosotros, medios de
                                    gracia divinamente ordenados, nuestro voto público de su misión al Cristo una vez
                                    crucificado y ahora resurrecto y la anticipación de su vuelta y de la consumación
                                    de todas las</li>
                                <li><strong>La restauración de todas las cosas:</strong> creemos en la vuelta personal, gloriosa y
                                    corporal de Nuestro Señor Jesucristo con sus santos ángeles, cuando él ejercerá
                                    su papel final de juez y su reino será consumado. Creemos en la resurrección del
                                    cuerpo de ambos, justos injustos - los injustos para el juicio y castigo eterno y
                                    conscientes en el infierno, como enseño el propio señor, y los justos para la
                                    bendición eterna en la presencia de aquel que está sentado en el trono y del
                                    cordero, en el nuevo cielo y nueva tierra, habitación de justicia. En aquel día, la
                                    iglesia será presentada sin mácula delante de Dios por la obediencia, sufrimiento y
                                    triunfo de Cristo, todo pecado será expurgado y sus efectos nefastos abolidos
                                    para siempre. Dios será todo en todos y su pueblo será envuelto por su inmediata
                                    inefable santidad, y todo será para alabanza de su gloriosa gracia.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Ubicación</h5>
                        <a
                            href="https://www.google.com/maps/dir//Deber+Cumplido+253,+Puerto+Montt,+Los+Lagos/"
                            className={styles.footerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Deber Cumplido 253, Puerto Montt, Los Lagos
                        </a>
                    </div>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Redes sociales</h5>
                        <div className={styles.socialLinks}>
                            <a
                                href="https://www.instagram.com/iglesiatupahue"
                                className={styles.footerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-instagram"></i> Instagram
                            </a>
                            <a
                                href="https://www.youtube.com/@iglesiareformadapuertomontt"
                                className={styles.footerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-youtube"></i> YouTube
                            </a>
                            <a
                                href="https://www.facebook.com/iglesiatupahue"
                                className={styles.footerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-facebook"></i> Facebook
                            </a>
                        </div>
                    </div>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Contáctanos</h5>
                        <a href="tel:+56956088059" className={styles.footerLink}>
                            <i className="bi bi-telephone"></i> +56 9 5608 8059
                        </a>
                    </div>
                </div>
                <hr className={styles.footerDivider} />
                <div className={styles.footerCopyright}>
                    <p>©️ 2025 | Todos los derechos reservados. Iglesia Reformada Tupahue.</p>
                </div>
            </footer>
        </div>
    );
}
