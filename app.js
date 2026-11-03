/**
 * app.js — SPA «Итоговый тест по действиям при угрозе БПЛА»
 * Vanilla JS ES6+, без фреймворков
 * Версия: 2.0 (Обучающий режим + Рандомизация + Множественный выбор)
 */

/* ════════════════════════════════════════════════════════════
   1. БАНК ВОПРОСОВ (40 вопросов)
   Источники: ФЗ № 68, ФЗ № 35, учебный курс по БПЛА
   correctIndex — индекс правильного ответа (0-based) или массив индексов.
════════════════════════════════════════════════════════════ */
const QUESTION_BANK = [
  {
    id: 'q1',
    text: 'Что входит в базовую доктрину выживания «Правило трех НЕ» при угрозе БПЛА?',
    options: [
      'НЕ снимать и НЕ демаскировать',
      'НЕ приближаться и НЕ трогать',
      'НЕ оставаться на открытом месте',
      'НЕ звонить в экстренные службы'
    ],
    correctIndex: [0, 1, 2],
    explanation: '✅ Верно. Базовая доктрина включает три запрета: не снимать/демаскировать, не приближаться/трогать, не оставаться на открытом месте. ❌ Неверно: звонить в экстренные службы как раз нужно, но только из безопасного места.'
  },
  {
    id: 'q2',
    text: 'Кто обязан соблюдать правила безопасности при угрозе БПЛА на объекте?',
    options: [
      'Только генеральный директор',
      'Только служба охраны',
      'Абсолютно все: от рядового рабочего до директора и подрядчиков',
      'Только специалисты по охране труда'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Правила обязательны для всех без исключения, включая подрядчиков и руководителей. ❌ Неверно: халатность здесь ведёт к уголовной ответственности независимо от должности.'
  },
  {
    id: 'q3',
    text: 'Почему при атаке БПЛА главную опасность в здании представляют окна?',
    options: [
      'Из-за сквозняка',
      'Ударная волна превращает стекло в летящие лезвия',
      'Через них проникает радиация',
      'Они пропускают звук дрона'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Большинство людей при ударе по зданию гибнет не от прямого попадания, а от осколков стекла, которые разлетаются с огромной скоростью. ❌ Неверно: сквозняк или звук не смертельны, а радиации при обычном ударе нет.'
  },
  {
    id: 'q4',
    text: 'В чём заключается правило «двух стен» при нахождении в здании?',
    options: [
      'Нужно спрятаться в комнате, где есть две стены',
      'Между вами и улицей должно быть как минимум две капитальные стены',
      'Нужно встать в угол, образованный двумя стенами',
      'Необходимо выбежать из здания через две стены'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Первая (фасадная) стена принимает удар, а вторая (внутренняя) защищает вас от её осколков. ❌ Неверно: просто наличие двух стен не работает, они должны быть между вами и улицей.'
  },
  {
    id: 'q5',
    text: 'Что категорически запрещено делать в здании при угрозе атаки БПЛА?',
    options: [
      'Спускаться по лестнице',
      'Пользоваться лифтом',
      'Прятаться на верхних этажах',
      'Заходить в санузел'
    ],
    correctIndex: [1, 2],
    explanation: '✅ Верно. Лифт может быть обесточен (ловушка), а верхние этажи — самые уязвимые для атаки с воздуха. ❌ Неверно: лестницы и санузлы как раз относятся к безопасным зонам.'
  },
  {
    id: 'q6',
    text: 'Как правильно сгруппироваться в укрытии при угрозе взрыва?',
    options: [
      'Обхватить колени руками и пригнуть голову',
      'Лечь на спину и вытянуть ноги',
      'Приоткрыть рот для выравнивания давления',
      'Громко кричать, чтобы позвать помощь'
    ],
    correctIndex: [0, 2],
    explanation: '✅ Верно. Нужно сгруппироваться (обхватить колени, пригнуть голову) и обязательно приоткрыть рот, чтобы спасти барабанные перепонки от разрыва при скачке давления. ❌ Неверно: лежать на спине и кричать — ошибки.'
  },
  {
    id: 'q7',
    text: 'Что необходимо сделать, если вы находитесь в легкой бытовке или модульном КПП при атаке БПЛА?',
    options: [
      'Остаться внутри и спрятаться под стол',
      'Немедленно покинуть её и укрыться в складке местности (канаве)',
      'Закрыть окна и двери, отключить свет',
      'Спрятаться в подсобном помещении бытовки'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Тонкие стены бытовки прошиваются осколками насквозь. Нужно немедленно покинуть её и найти естественное укрытие снаружи. ❌ Неверно: оставаться внутри пластиковой коробки — смертельно опасно.'
  },
  {
    id: 'q8',
    text: 'Какая главная ошибка при нахождении на открытой местности во время атаки БПЛА?',
    options: [
      'Попытка найти канаву',
      'Падение на землю лицом вниз',
      'Попытка бежать в полный рост к далёкому зданию',
      'Перемещение перебежками'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Бегущий человек — это мишень, которая ловит в разы больше осколков. Если звук дрона прямо над вами, бежать к далёкому зданию самоубийственно. ❌ Неверно: падать и искать укрытие — правильные действия.'
  },
  {
    id: 'q9',
    text: 'Какие укрытия на открытой местности являются «обманчивыми» и не спасут от осколков?',
    options: [
      'Глубокая траншея',
      'Забор из профнастила',
      'Легковой автомобиль',
      'Бетонные блоки'
    ],
    correctIndex: [1, 2],
    explanation: '✅ Верно. Заборы, автомобили, рекламные щиты и стеклянные остановки не остановят боевой осколок, а сами превратятся в шрапнель. ❌ Неверно: траншеи и бетонные блоки — надёжные укрытия.'
  },
  {
    id: 'q10',
    text: 'Как правильно лечь на землю, если вы оказались в чистом поле без укрытия?',
    options: [
      'Лягте лицом вниз на живот',
      'Скрестите ноги вместе, чтобы защитить бедренные артерии',
      'Плотно закройте затылок и шею руками',
      'Приподнимите голову, чтобы наблюдать за дроном'
    ],
    correctIndex: [0, 1, 2],
    explanation: '✅ Верно. Нужно лечь лицом вниз, скрестить ноги, закрыть затылок и шею руками, приоткрыть рот и зажмуриться. ❌ Неверно: поднимать голову, чтобы смотреть на дрон, — значит подставлять её под осколки.'
  },
  {
    id: 'q11',
    text: 'Сколько времени нужно переждать после стихания звука мотора или взрыва на открытой местности, прежде чем вставать?',
    options: [
      'Сразу вскочить и бежать',
      'Посчитать до 10',
      'Посчитать про себя до 60',
      'Ждать 5 минут'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Нужно посчитать до 60, так как с неба ещё могут падать обломки, а за первым дроном может лететь второй (атака роем). ❌ Неверно: вскакивать сразу — риск получить осколок от падающих обломков.'
  },
  {
    id: 'q12',
    text: 'Почему автомобиль или спецтехника при атаке БПЛА превращаются в смертельную ловушку?',
    options: [
      'Стекло превращается в шрапнель',
      'Тонкий кузов прошивается осколками насквозь',
      'Полный бак горючего может сдетонировать',
      'В машине не работает радио'
    ],
    correctIndex: [0, 1, 2],
    explanation: '✅ Верно. Машина — это ловушка из-за стекла (шрапнель), тонкого металла и бака с топливом, который может взорваться. ❌ Неверно: отсутствие радио не является смертельной угрозой.'
  },
  {
    id: 'q13',
    text: 'Какое действие нужно выполнить первым делом, если вы за рулём и услышали звук приближающегося БПЛА?',
    options: [
      'Попытаться уехать на максимальной скорости',
      'Остановиться, заглушить двигатель и покинуть машину',
      'Опустить все стёкла и пригнуться',
      'Съехать на обочину и остаться внутри'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Нужно экстренно остановиться (не создавая ДТП), заглушить двигатель и покинуть машину. ❌ Неверно: пытаться уехать бесполезно — скорость дрона 150–200 км/ч, а оставаться внутри смертельно.'
  },
  {
    id: 'q14',
    text: 'На какое минимальное расстояние нужно отбежать от автомобиля при угрозе взрыва?',
    options: [
      'На 5 метров',
      'На 10 метров',
      'На 15–30 метров',
      'На 50 метров'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Машина — потенциальный эпицентр вторичного взрыва. Отбежать нужно минимум на 15–30 метров. ❌ Неверно: 5–10 метров слишком мало, вы останетесь в зоне поражения.'
  },
  {
    id: 'q15',
    text: 'Почему в тёмное время суток нельзя пользоваться фонариком или включать экран телефона на улице?',
    options: [
      'Свет работает как прицельный маркер для дрона',
      'Это слепит прохожих',
      'Садится батарейка',
      'Это привлекает комаров'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. Современные дроны оснащены тепловизорами и оптикой. Любой источник света в темноте — это вызов огня на себя. ❌ Неверно: остальное — незначительные причины по сравнению со смертельной угрозой.'
  },
  {
    id: 'q16',
    text: 'Почему в темноте при угрозе БПЛА категорически нельзя курить на улице?',
    options: [
      'Это вызывает пожар',
      'Тепловизор дрона легко зафиксирует тлеющую сигарету',
      'Дым привлечёт внимание животных',
      'Это запрещено только на территории предприятия'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Тление сигареты имеет высокую температуру (около 700°С) и отлично видно в тепловизор на фоне холодной земли. ❌ Неверно: дело не в пожаре, а в демаскировке.'
  },
  {
    id: 'q17',
    text: 'Если в темноте нужно посветить телефоном, чтобы не упасть в яму, как это сделать правильно?',
    options: [
      'Включить фонарик на полную яркость',
      'Направить луч в небо, чтобы осветить дрон',
      'Включить минимальную яркость, направить луч вертикально вниз на носки ботинок и прикрыть ладонью',
      'Включить камеру и использовать вспышку'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Нужно использовать минимальную яркость, светить строго вниз и прикрывать ладонью, чтобы свет не рассеивался. ❌ Неверно: светить в небо или использовать вспышку — значит выдать свои координаты.'
  },
  {
    id: 'q18',
    text: 'Вы обнаружили упавший беспилотник. Какое действие необходимо выполнить ПЕРВЫМ делом?',
    options: [
      'Сфотографировать его на телефон',
      'Замереть, не делать ни шагу вперёд и оценить обстановку под ногами',
      'Пнуть его ногой, чтобы проверить реакцию',
      'Позвонить по рации коллегам'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Нужно замереть на месте, так как обломков может быть несколько, и вы можете стоять в шаге от другого фрагмента. ❌ Неверно: фото, пинки и звонки рядом с дроном могут активировать взрыватель.'
  },
  {
    id: 'q19',
    text: 'Почему упавший БПЛА или его обломок смертельно опасен?',
    options: [
      'Он может быть оснащён системой самоликвидации',
      'Детонатор может сработать от изменения положения',
      'Взрыв может произойти по таймеру',
      'Он излучает радиацию'
    ],
    correctIndex: [0, 1, 2],
    explanation: '✅ Верно. Упавший дрон — это взведённая мина. Ловушки реагируют на движение, свет, время или радиосигнал. ❌ Неверно: радиационная угроза для обычных дронов не характерна.'
  },
  {
    id: 'q20',
    text: 'Почему нельзя пользоваться мобильным телефоном или рацией вблизи упавшего БПЛА?',
    options: [
      'Из-за помех в сети',
      'Радиосигнал может активировать электронный взрыватель',
      'Это отвлекает от наблюдения за небом',
      'Это приведёт к быстрой разрядке аккумулятора'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Электромагнитное излучение от телефона или рации может замкнуть цепь и вызвать детонацию. ❌ Неверно: помехи и разрядка батареи — не главная причина, главное — не спровоцировать взрыв.'
  },
  {
    id: 'q21',
    text: 'На какое минимальное расстояние необходимо отойти от упавшего БПЛА или его обломков?',
    options: [
      'На 10 метров',
      'На 50 метров',
      'На 100 метров',
      'На 300 метров'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Безопасная дистанция — минимум 100 метров. Нужно отходить медленно и плавно, не поворачиваясь спиной. ❌ Неверно: 10 и 50 метров не гарантируют защиту от разлёта осколков.'
  },
  {
    id: 'q22',
    text: 'В чём главная невидимая опасность взрыва (кроме осколков)?',
    options: [
      'Избыточное давление ударной волны (баротравма)',
      'Вторичные поражающие элементы (мебель, арматура)',
      'Поражение электрическим током',
      'Радиоактивное заражение'
    ],
    correctIndex: [0, 1],
    explanation: '✅ Верно. Ударная волна может разорвать перепонки и повредить лёгкие, а вторичные осколки (обломки зданий и мебели) несут смерть. ❌ Неверно: электричество и радиация — не типичные факторы при взрыве БПЛА.'
  },
  {
    id: 'q23',
    text: 'Какие рефлексы нужно включить в момент взрыва (при вспышке)?',
    options: [
      'Упасть туда, где стоите',
      'Сгруппироваться и закрыть шею/затылок руками',
      'Открыть рот и зажмурить глаза',
      'Встать в полный рост и бежать'
    ],
    correctIndex: [0, 1, 2],
    explanation: '✅ Верно. Нужно упасть, сгруппироваться, закрыть голову, открыть рот и зажмуриться. ❌ Неверно: вставать и бежать в момент прихода ударной волны — верная смерть.'
  },
  {
    id: 'q24',
    text: 'Почему после взрыва категорически нельзя зажигать спички или зажигалки для освещения?',
    options: [
      'Может произойти утечка газа, и искра вызовет объёмный взрыв',
      'Огонь выжжет остатки кислорода',
      'Это привлечёт внимание дрона',
      'Это запрещено правилами пожарной безопасности'
    ],
    correctIndex: [0, 1],
    explanation: '✅ Верно. Взрыв мог повредить газовые магистрали. Малейшая искра в пыле-газовой смеси приведёт к объемному взрыву, а огонь выжжет кислород. ❌ Неверно: главные причины — газ и кислород.'
  },
  {
    id: 'q25',
    text: 'Как необходимо передвигаться в помещении, если произошёл взрыв и началось задымление?',
    options: [
      'В полный рост, быстро бегом к выходу',
      'Ползком или на четвереньках вдоль несущих стен',
      'По стенам, держась за них руками',
      'Пригнувшись, но не опускаясь на пол'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Чистый воздух остаётся внизу (на уровне 20–30 см), поэтому двигаться нужно ползком вдоль несущих стен, которые реже проваливаются. ❌ Неверно: бежать в полный рост — значит надышаться дымом и упасть.'
  },
  {
    id: 'q26',
    text: 'Что нужно делать под завалом, чтобы спасатели вас обнаружили?',
    options: [
      'Постоянно громко кричать',
      'Стучать металлическим предметом по бетону или трубе (3 удара — пауза)',
      'Свистеть в свисток без остановки',
      'Включить камеру телефона со вспышкой'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Ритмичный стук по металлу/бетону — самый эффективный способ привлечь внимание во время «минут тишины». ❌ Неверно: постоянный крик расходует силы, кислород и приводит к удушью от пыли.'
  },
  {
    id: 'q27',
    text: 'Как рационально использовать телефон под завалом?',
    options: [
      'Отправить СМС руководителю с указанием своего местоположения',
      'Перевести телефон в режим энергосбережения',
      'Включить фонарик для освещения',
      'Смотреть видео или сидеть в соцсетях'
    ],
    correctIndex: [0, 1],
    explanation: '✅ Верно. СМС требует меньше сигнала, чем звонок, а энергосбережение поможет сохранить заряд. ❌ Неверно: фонарик и соцсети быстро посадят батарею, и вы останетесь без связи.'
  },
  {
    id: 'q28',
    text: 'Почему при угрозе БПЛА нельзя пускать на территорию людей, которых нет в официальных списках?',
    options: [
      'Они могут украсть имущество',
      'В случае ЧС спасатели не будут их искать, а руководитель понесёт уголовную ответственность',
      'Они займут места в укрытии',
      'Они могут вызвать панику'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Спасатели ищут людей только по официальным спискам. Если человека нет в документах, де-юре его нет на объекте, и вся уголовная тяжесть ляжет на руководителя. ❌ Неверно: главная причина — жизни людей и уголовная ответственность.'
  },
  {
    id: 'q29',
    text: 'Какие действия обязан выполнить руководитель при сигнале тревоги?',
    options: [
      'Громко отдать команду всем покинуть рабочие места и следовать в укрытие',
      'Уйти в укрытие последним, визуально проверив помещения',
      'Скрыть от экстренных служб наличие неоформленных рабочих',
      'Провести перекличку в укрытии'
    ],
    correctIndex: [0, 1, 3],
    explanation: '✅ Верно. Руководитель обязан организовать эвакуацию, уйти последним и провести перекличку. ❌ Неверно: скрывать людей от МЧС — это преступление, которое приведёт к гибели людей.'
  },
  {
    id: 'q30',
    text: 'На какие категории необходимо разделить людей при перекличке в укрытии?',
    options: [
      'Находящиеся в укрытии',
      'Отсутствующие (в отпуске/на больничном)',
      'Пропавшие без вести (были на смене, но не в укрытии)',
      'Раненые и контуженные'
    ],
    correctIndex: [0, 1, 2],
    explanation: '✅ Верно. Нужно чётко разделить людей на три категории: в укрытии, отсутствуют и пропали без вести. ❌ Неверно: разделение на раненых/контуженных происходит уже в процессе оказания помощи, а для штаба важны именно эти три категории.'
  },
  {
    id: 'q31',
    text: 'В какой режим должна переводиться система контроля управления доступом (СКУД) при чрезвычайной ситуации?',
    options: [
      'В режим полной блокировки',
      'В режим «Антипаника» (открытие всех дверей и снятие блокировок)',
      'В режим ожидания',
      'СКУД не должна отключаться ни при каких обстоятельствах'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Режим «Антипаника» снимает напряжение с магнитных замков, чтобы люди могли выбежать, а носилки скорой — заноситься внутрь. ❌ Неверно: блокировка дверей при ЧС — это смертельная ловушка.'
  },
  {
    id: 'q32',
    text: 'Что обязан сообщить руководитель старшему офицеру МЧС при прибытии?',
    options: [
      'Количество людей внутри и их местоположение',
      'Статус коммуникаций (обесточен ли объект, перекрыт ли газ)',
      'Наличие взрывоопасных веществ (баллоны, ГСМ)',
      'План здания и схему гидрантов'
    ],
    correctIndex: [0, 1, 2, 3],
    explanation: '✅ Верно. Вся эта информация критически важна для спасения людей и безопасности самих спасателей. ❌ Неверно: скрывать хотя бы один из этих пунктов — преступление.'
  },
  {
    id: 'q33',
    text: 'Что делать с личным и служебным транспортом, брошенным на разворотных площадках и у гидрантов?',
    options: [
      'Оставить как есть',
      'Немедленно эвакуировать, чтобы обеспечить проезд МЧС',
      'Разбить стёкла, чтобы открыть капот',
      'Сжечь, чтобы не мешал'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Пожарная автоцистерна (более 15 тонн) не сможет маневрировать между машинами. Транспорт нужно эвакуировать немедленно. ❌ Неверно: оставлять машины на проезде — значит блокировать спасение людей.'
  },
  {
    id: 'q34',
    text: 'Почему нельзя скрывать от МЧС наличие газовых баллонов или склада ГСМ в зоне возгорания?',
    options: [
      'Чтобы не усложнять ситуацию',
      'Это приведёт к гибели пожарного расчёта при взрыве',
      'Это замедлит тушение пожара',
      'Это не имеет значения'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Утаивание информации о взрывоопасных веществах может привести к гибели спасателей. ❌ Неверно: скрывать такую информацию — прямое преступление.'
  },
  {
    id: 'q35',
    text: 'Почему при обнаружении упавшего дрона нельзя пытаться его тушить или накрывать песком?',
    options: [
      'Это может привести к взрыву',
      'Это загрязняет окружающую среду',
      'Это бесполезно',
      'Это запрещено правилами'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. Если обломок дымится, ваши действия с огнетушителем или песком могут спровоцировать детонацию. Нужно просто отойти на 100 метров. ❌ Неверно: главная причина — риск взрыва.'
  },
  {
    id: 'q36',
    text: 'Почему при обнаружении упавшего БПЛА нельзя кричать и подходить к нему?',
    options: [
      'Это привлекает внимание других людей',
      'Любое физическое воздействие или звук могут активировать взрыватель',
      'Это нарушает тишину',
      'Это не имеет значения'
    ],
    correctIndex: 1,
    explanation: '✅ Верно. Упавший дрон — это ловушка, которая может сработать от малейшего физического воздействия или акустического сигнала. ❌ Неверно: крик и приближение смертельно опасны.'
  },
  {
    id: 'q37',
    text: 'Что нужно сделать, если вы поняли, что зажаты под завалом?',
    options: [
      'Резко дёргаться, чтобы выбраться',
      'Попытаться разобрать завал сверху',
      'Защитить дыхание, остановить кровотечение, оценить пространство и подпереть потолок',
      'Громко кричать без остановки'
    ],
    correctIndex: 2,
    explanation: '✅ Верно. Нужно защитить дыхание, остановить кровь, оценить пространство и, если безопасно, подпереть потолок. ❌ Неверно: резкие движения могут вызвать вторичное обрушение.'
  },
  {
    id: 'q38',
    text: 'Почему под завалом нельзя зажигать спички или зажигалки?',
    options: [
      'Под завалами может скапливаться газ из пробитых труб',
      'Огонь выжжет остатки кислорода',
      'Это может выдать ваше местоположение',
      'Это запрещено правилами'
    ],
    correctIndex: [0, 1],
    explanation: '✅ Верно. Искра может вызвать объёмный взрыв, а огонь выжжет кислород в замкнутом пространстве. ❌ Неверно: главные причины — газ и кислород.'
  },
  {
    id: 'q39',
    text: 'Что необходимо сделать при артериальном кровотечении под завалом?',
    options: [
      'Прижать рану рукой или перетянуть тканью',
      'Промыть рану водой',
      'Приложить лёд',
      'Ничего не делать'
    ],
    correctIndex: 0,
    explanation: '✅ Верно. Артериальное кровотечение требует немедленного прижатия или наложения жгута. ❌ Неверно: промывание и лёд не остановят артериальное кровотечение.'
  },
  {
    id: 'q40',
    text: 'Почему нельзя пытаться уехать от дрона на автомобиле?',
    options: [
      'Дрон может лететь быстрее машины',
      'Машина — это ловушка',
      'Дрон может атаковать машину',
      'Это бесполезно'
    ],
    correctIndex: [0, 1],
    explanation: '✅ Верно. Скорость дрона-камикадзе (150–200 км/ч) превышает скорость автомобиля, а машина сама по себе является ловушкой. ❌ Неверно: пытаться уехать — значит остаться в ловушке.'
  }
];

/* ════════════════════════════════════════════════════════════
   2. КОНФИГУРАЦИЯ И СОСТОЯНИЕ
════════════════════════════════════════════════════════════ */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdNZP-aaxv3eR6hjS3RP_7pm5IC67DBTbA0oL0MDqojiEbZVtoG3qSzLEyvm10VlG5sA/exec';
const PASS_THRESHOLD = 0.85;
const QUESTIONS_PER_QUIZ = 20;

const state = {
  currentScene: 1,
  consentGiven: false,
  userData: { fullName: '', organization: '', position: '', department: '', birthDate: '', hireDate: '' },
  quizQuestions: [],         // 20 выбранных и перемешанных вопросов
  answers: [],               // ответы пользователя (массивы индексов или одиночные индексы)
  currentQuestionIndex: 0,
  isAnswered: false          // флаг: нажат ли "Ответить" на текущем вопросе
};

/* ════════════════════════════════════════════════════════════
   3. DOM-ССЫЛКИ
════════════════════════════════════════════════════════════ */

const sceneMap = {
  1: document.getElementById('scene-welcome'),
  2: document.getElementById('scene-consent'),
  3: document.getElementById('scene-form'),
  4: document.getElementById('scene-quiz'),
  5: document.getElementById('scene-result')
};

const btnStart       = document.getElementById('btn-start');
const btnConsentCont = document.getElementById('btn-consent-continue');
const btnFormSubmit  = document.getElementById('btn-form-submit');
const btnNext        = document.getElementById('btn-next');
const btnNextLabel   = document.getElementById('btn-next-label');
const btnRetry       = document.getElementById('btn-retry');

const consentCheckbox = document.getElementById('consent-checkbox');

const inputFullname   = document.getElementById('input-fullname');
const inputOrg        = document.getElementById('input-org');
const inputPosition   = document.getElementById('input-position');
const inputDepartment = document.getElementById('input-department');
const inputBirthdate  = document.getElementById('input-birthdate');
const inputHiredate   = document.getElementById('input-hiredate');

const quizCounter      = document.getElementById('quiz-counter');
const progressBarFill  = document.getElementById('progress-bar-fill');
const progressBarTrack = document.getElementById('progress-bar-track');
const questionCard     = document.getElementById('question-card');
const questionNumber   = document.getElementById('question-number');
const questionText     = document.getElementById('question-text');
const optionsList      = document.getElementById('options-list');
const explanationBox   = document.getElementById('explanation-box');

const resultIconWrap = document.getElementById('result-icon-wrap');
const resultTitle    = document.getElementById('result-title');
const resultText     = document.getElementById('result-text');
const scoreNumber    = document.getElementById('score-number');
const scoreRingFill  = document.getElementById('score-ring-fill');
const statCorrect    = document.getElementById('stat-correct');
const statPercent    = document.getElementById('stat-percent');
const statStatus     = document.getElementById('stat-status');
const submitStatus   = document.getElementById('submit-status');

/* ════════════════════════════════════════════════════════════
   4. УТИЛИТЫ
════════════════════════════════════════════════════════════ */

/**
 * Перемешивание массива (алгоритм Фишера-Йетса)
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Подготовка вопросов для теста:
 * 1. Выбираем 20 случайных вопросов из банка.
 * 2. Перемешиваем варианты ответов и сохраняем originalIndex.
 */
function prepareQuizQuestions() {
  const shuffledBank = shuffleArray(QUESTION_BANK);
  const selected = shuffledBank.slice(0, QUESTIONS_PER_QUIZ);

  return selected.map(q => {
    const correctIndices = Array.isArray(q.correctIndex) ? q.correctIndex : [q.correctIndex];
    
    // Создаем массив вариантов с привязкой к оригинальному индексу
    const optionsWithIndex = q.options.map((text, originalIndex) => ({
      text,
      originalIndex,
      isCorrect: correctIndices.includes(originalIndex)
    }));

    // Перемешиваем варианты
    const shuffledOptions = shuffleArray(optionsWithIndex);

    return {
      ...q,
      shuffledOptions, // Массив { text, originalIndex, isCorrect }
      isMultiple: correctIndices.length > 1
    };
  });
}

/* ════════════════════════════════════════════════════════════
   5. УПРАВЛЕНИЕ СЦЕНАМИ
════════════════════════════════════════════════════════════ */

function showScene(n) {
  Object.entries(sceneMap).forEach(([idx, scene]) => {
    if (!scene) return;
    if (Number(idx) === n) {
      scene.classList.add('active');
      scene.removeAttribute('aria-hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scene.classList.remove('active');
      scene.setAttribute('aria-hidden', 'true');
    }
  });
  state.currentScene = n;
}

/* ════════════════════════════════════════════════════════════
   6. СЦЕНА 2: СОГЛАСИЕ
════════════════════════════════════════════════════════════ */

function updateConsentButton() {
  const checked = consentCheckbox.checked;
  state.consentGiven = checked;
  btnConsentCont.disabled = !checked;
  btnConsentCont.setAttribute('aria-disabled', String(!checked));
}
consentCheckbox.addEventListener('change', updateConsentButton);

/* ════════════════════════════════════════════════════════════
   7. СЦЕНА 3: ВАЛИДАЦИЯ ФОРМЫ
════════════════════════════════════════════════════════════ */

const formFields = [inputFullname, inputOrg, inputPosition, inputDepartment, inputBirthdate, inputHiredate];

function validateForm() {
  const allFilled = formFields.every(f => f.value.trim() !== '');
  btnFormSubmit.disabled = !allFilled;
  btnFormSubmit.setAttribute('aria-disabled', String(!allFilled));
}

formFields.forEach(field => {
  field.addEventListener('input', validateForm);
  field.addEventListener('change', validateForm);
});

function collectFormData() {
  state.userData = {
    fullName: inputFullname.value.trim(),
    organization: inputOrg.value.trim(),
    position: inputPosition.value.trim(),
    department: inputDepartment.value.trim(),
    birthDate: inputBirthdate.value,
    hireDate: inputHiredate.value
  };
}

/* ════════════════════════════════════════════════════════════
   8. СЦЕНА 4: ЛОГИКА ТЕСТА (Обучающий режим)
════════════════════════════════════════════════════════════ */

function startQuiz() {
  state.quizQuestions = prepareQuizQuestions();
  state.answers = new Array(QUESTIONS_PER_QUIZ).fill(null);
  state.currentQuestionIndex = 0;
  renderQuestion(0);
}

/**
 * Отрисовка текущего вопроса
 */
function renderQuestion(index) {
  const q = state.quizQuestions[index];
  const num = index + 1;

  // Сброс режима ответа
  state.isAnswered = false;
  explanationBox.style.display = 'none';
  explanationBox.innerHTML = '';

  // Обновление прогресса
  quizCounter.textContent = `Вопрос ${num} из ${QUESTIONS_PER_QUIZ}`;
  const pct = (index / QUESTIONS_PER_QUIZ) * 100;
  progressBarFill.style.width = pct + '%';
  progressBarTrack.setAttribute('aria-valuenow', String(index));
  questionNumber.textContent = 'Вопрос ' + String(num).padStart(2, '0');
  questionText.textContent = q.text;

  // Рендер вариантов
  optionsList.innerHTML = '';
  const currentAnswer = state.answers[index];

  q.shuffledOptions.forEach((opt, optIdx) => {
    const label = document.createElement('label');
    label.className = 'option-label';
    label.setAttribute('for', `opt-${index}-${optIdx}`);

    const input = document.createElement('input');
    input.type = q.isMultiple ? 'checkbox' : 'radio';
    input.name = `q${index}`;
    input.id = `opt-${index}-${optIdx}`;
    input.value = opt.originalIndex;
    input.className = q.isMultiple ? 'option-checkbox' : 'option-radio';

    if (currentAnswer) {
      if (q.isMultiple && Array.isArray(currentAnswer)) {
        if (currentAnswer.includes(opt.originalIndex)) input.checked = true;
      } else if (currentAnswer === opt.originalIndex) {
        input.checked = true;
      }
    }

    input.addEventListener('change', () => onOptionSelect(index, opt.originalIndex, q.isMultiple));

    const marker = document.createElement('span');
    marker.className = q.isMultiple ? 'option-checkbox-marker' : 'option-marker';
    marker.setAttribute('aria-hidden', 'true');

    const textSpan = document.createElement('span');
    textSpan.className = 'option-text';
    textSpan.textContent = opt.text;

    label.appendChild(input);
    label.appendChild(marker);
    label.appendChild(textSpan);
    optionsList.appendChild(label);
  });

  // Настройка кнопки
  btnNextLabel.textContent = 'Ответить';
  btnNext.disabled = true; // Активируется после выбора
  btnNext.setAttribute('aria-disabled', 'true');
  
  if (currentAnswer) {
    btnNext.disabled = false;
    btnNext.setAttribute('aria-disabled', 'false');
  }
}

/**
 * Обработка выбора варианта
 */
function onOptionSelect(qIndex, originalIndex, isMultiple) {
  if (state.isAnswered) return; // Блокировка после ответа

  if (isMultiple) {
    let selected = state.answers[qIndex] || [];
    if (selected.includes(originalIndex)) {
      selected = selected.filter(i => i !== originalIndex);
    } else {
      selected.push(originalIndex);
    }
    state.answers[qIndex] = selected.length > 0 ? selected : null;
  } else {
    state.answers[qIndex] = originalIndex;
  }

  // Активация кнопки, если есть хотя бы один выбор
  const hasAnswer = isMultiple 
    ? (state.answers[qIndex] && state.answers[qIndex].length > 0)
    : (state.answers[qIndex] !== null);
  
  btnNext.disabled = !hasAnswer;
  btnNext.setAttribute('aria-disabled', String(!hasAnswer));
}

/**
 * Нажатие на кнопку "Ответить" / "Далее"
 */
function handleNextClick() {
  const qIndex = state.currentQuestionIndex;
  const q = state.quizQuestions[qIndex];

  if (!state.isAnswered) {
    // Фаза 1: Проверка ответа
    state.isAnswered = true;
    
    // Блокировка инпутов и подсветка
    const labels = optionsList.querySelectorAll('.option-label');
    const currentAnswer = state.answers[qIndex];

    labels.forEach(label => {
      const input = label.querySelector('input');
      const originalIndex = parseInt(input.value, 10);
      const isCorrectOption = q.shuffledOptions.find(o => o.originalIndex === originalIndex).isCorrect;

      if (q.isMultiple) {
        const userSelected = Array.isArray(currentAnswer) && currentAnswer.includes(originalIndex);
        if (isCorrectOption) {
          label.classList.add('is-correct');
        } else if (userSelected && !isCorrectOption) {
          label.classList.add('is-incorrect');
        }
      } else {
        const userSelected = currentAnswer === originalIndex;
        if (isCorrectOption) {
          label.classList.add('is-correct');
        } else if (userSelected && !isCorrectOption) {
          label.classList.add('is-incorrect');
        }
      }
      input.disabled = true;
    });

    // Показ объяснения
    explanationBox.innerHTML = `<p>${q.explanation}</p>`;
    explanationBox.style.display = 'block';

    // Смена текста кнопки
    if (qIndex === QUESTIONS_PER_QUIZ - 1) {
      btnNextLabel.textContent = 'Завершить тест';
    } else {
      btnNextLabel.textContent = 'Далее';
    }
    btnNext.disabled = false;
  } else {
    // Фаза 2: Переход к следующему вопросу
    if (qIndex < QUESTIONS_PER_QUIZ - 1) {
      questionCard.classList.add('leaving');
      setTimeout(() => {
        questionCard.classList.remove('leaving');
        state.currentQuestionIndex++;
        renderQuestion(state.currentQuestionIndex);
      }, 250);
    } else {
      showResults();
    }
  }
}

/* ════════════════════════════════════════════════════════════
   9. СЦЕНА 5: РЕЗУЛЬТАТЫ
════════════════════════════════════════════════════════════ */

function calculateResult() {
  let correct = 0;
  state.quizQuestions.forEach((q, idx) => {
    const userAnswer = state.answers[idx];
    const correctIndices = Array.isArray(q.correctIndex) ? q.correctIndex : [q.correctIndex];

    if (q.isMultiple) {
      // Строгое совпадение для множественного выбора
      const userArr = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
      const correctArr = [...correctIndices].sort();
      if (userArr.length === correctArr.length && userArr.every((val, i) => val === correctArr[i])) {
        correct++;
      }
    } else {
      if (userAnswer === correctIndices[0]) {
        correct++;
      }
    }
  });

  const percent = Math.round((correct / QUESTIONS_PER_QUIZ) * 100);
  const passed = (correct / QUESTIONS_PER_QUIZ) >= PASS_THRESHOLD;
  return { correct, percent, passed };
}

function showResults() {
  const { correct, percent, passed } = calculateResult();
  showScene(5);

  resultIconWrap.textContent = passed ? '🎉' : '😔';
  resultTitle.className = 'result-title ' + (passed ? 'success' : 'failure');
  resultTitle.textContent = passed ? 'Поздравляем! Тест сдан успешно.' : 'Тест не сдан.';
  resultText.textContent = passed
    ? 'Вы успешно прошли итоговый тест по действиям при угрозе БПЛА. Ваши результаты сохранены в системе.'
    : `Вы ответили правильно на ${correct} из ${QUESTIONS_PER_QUIZ} вопросов. Рекомендуем освежить знания по материалам инструктажа и попробовать ещё раз. У вас обязательно получится!`;

  scoreNumber.textContent = String(correct);
  statCorrect.textContent = `${correct} из ${QUESTIONS_PER_QUIZ}`;
  statPercent.textContent = percent + '%';
  statStatus.textContent = passed ? 'Сдал / Сдала' : 'Не сдан';
  statStatus.className = 'stat-value stat-status ' + (passed ? 'success' : 'failure');

  const offset = 314 - (percent / 100) * 314;
  scoreRingFill.className = 'score-ring-fill ' + (passed ? 'success' : 'failure');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scoreRingFill.style.strokeDashoffset = String(offset);
    });
  });

  progressBarFill.style.width = '100%';
  progressBarTrack.setAttribute('aria-valuenow', String(QUESTIONS_PER_QUIZ));

  submitStatus.textContent = '';
  submitStatus.className = 'submit-status';

  const payload = {
    fullName: state.userData.fullName,
    organization: state.userData.organization,
    position: state.userData.position,
    department: state.userData.department,
    birthDate: state.userData.birthDate,
    hireDate: state.userData.hireDate,
    correctAnswers: correct,
    totalQuestions: QUESTIONS_PER_QUIZ,
    percent: percent,
    passed: passed,
    timestamp: new Date().toISOString()
  };

  sendResultsToGoogleSheets(payload);
}

/* ════════════════════════════════════════════════════════════
   10. ОТПРАВКА В GOOGLE SHEETS
════════════════════════════════════════════════════════════ */

async function sendResultsToGoogleSheets(payload) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_DEPLOYED_APPS_SCRIPT_URL') {
    console.warn('[Quiz] Google Apps Script URL не настроен.');
    submitStatus.textContent = '⚠ URL Google Sheets не настроен (см. README.md)';
    submitStatus.className = 'submit-status error';
    return;
  }

  submitStatus.textContent = '⏳ Сохранение результатов...';
  submitStatus.className = 'submit-status sending';

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('[Quiz] Данные отправлены:', payload);
    submitStatus.textContent = '✅ Результаты сохранены в системе';
    submitStatus.className = 'submit-status sent';
  } catch (error) {
    console.error('[Quiz] Ошибка отправки:', error);
    submitStatus.textContent = '⚠ Не удалось сохранить результаты. Обратитесь к ответственному за безопасность.';
    submitStatus.className = 'submit-status error';
  }
}

/* ════════════════════════════════════════════════════════════
   11. СБРОС И ИНИЦИАЛИЗАЦИЯ
════════════════════════════════════════════════════════════ */

function resetApp() {
  state.consentGiven = false;
  state.userData = { fullName: '', organization: '', position: '', department: '', birthDate: '', hireDate: '' };
  state.quizQuestions = [];
  state.answers = [];
  state.currentQuestionIndex = 0;
  state.isAnswered = false;

  formFields.forEach(f => { f.value = ''; });
  validateForm();

  consentCheckbox.checked = false;
  updateConsentButton();

  scoreRingFill.style.strokeDashoffset = '314';
  scoreRingFill.className = 'score-ring-fill';

  showScene(1);
}

/* ════════════════════════════════════════════════════════════
   12. ОБРАБОТЧИКИ СОБЫТИЙ
════════════════════════════════════════════════════════════ */

btnStart.addEventListener('click', () => showScene(2));

btnConsentCont.addEventListener('click', () => {
  if (state.consentGiven) showScene(3);
});

btnFormSubmit.addEventListener('click', () => {
  collectFormData();
  startQuiz();
  showScene(4);
});

btnNext.addEventListener('click', handleNextClick);
btnRetry.addEventListener('click', resetApp);

document.getElementById('user-form').addEventListener('submit', e => e.preventDefault());

function init() {
  showScene(1);
  updateConsentButton();
  validateForm();
  btnNext.disabled = true;
  btnNext.setAttribute('aria-disabled', 'true');
  console.log('[Quiz] Приложение инициализировано. Банк вопросов:', QUESTION_BANK.length, '| В тесте:', QUESTIONS_PER_QUIZ);
}

document.addEventListener('DOMContentLoaded', init);
