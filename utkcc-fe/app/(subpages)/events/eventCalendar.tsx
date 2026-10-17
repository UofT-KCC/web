'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { calendarEvents, CalendarEvent, eventCategories, EventCategory } from '@/data/calendar-events';
import { formatDate, monthDays, occursOn, shiftMonth } from './calendarDates';
import styles from './eventCalendar.module.css';
import EventsGallery from './eventsGallery';
import InvitationArchive from './invitationArchive';

function Icon({ name }: { name: string }) {
  return <ion-icon name={name} aria-hidden="true" />;
}

function EventBadge({ category }: { category: EventCategory }) {
  const info = eventCategories[category];
  return <span className={styles.badge} style={{ color: info.color, background: info.background }}><Icon name={info.icon} />{info.label}</span>;
}

function dateRange(event: CalendarEvent) {
  return `${formatDate(event.date)}${event.endDate ? ` – ${formatDate(event.endDate)}` : ''}`;
}

function isMultiDay(event: CalendarEvent) {
  return Boolean(event.endDate && event.endDate !== event.date);
}

const categoryFilterOptions: { value: EventCategory | 'all'; label: string; color?: string }[] = [
  { value: 'all', label: 'All events' },
  ...Object.entries(eventCategories).map(([key, info]) => ({ value: key as EventCategory, label: info.label, color: info.color })),
];

function CategoryFilter({ value, onChange }: { value: EventCategory | 'all'; onChange: (value: EventCategory | 'all') => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = categoryFilterOptions.find(option => option.value === value) ?? categoryFilterOptions[0];

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.filter} ref={rootRef}>
      <button type="button" className={styles.filterButton} aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen(o => !o)}>
        {current.color && <i className={styles.filterDot} style={{ background: current.color }} />}
        <span>{current.label}</span>
        <Icon name={open ? 'chevron-up-outline' : 'chevron-down-outline'} />
      </button>
      {open && <ul className={styles.filterMenu} role="listbox" aria-label="Event category">
        {categoryFilterOptions.map(option => (
          <li key={option.value} role="option" aria-selected={option.value === value}>
            <button type="button"
              className={`${styles.filterOption} ${option.value === value ? styles.filterOptionActive : ''}`}
              onClick={() => { onChange(option.value); setOpen(false); }}>
              {option.color && <i className={styles.filterDot} style={{ background: option.color }} />}
              {option.label}
            </button>
          </li>
        ))}
      </ul>}
    </div>
  );
}

function EventDetails({ event, onClose }: { event: CalendarEvent; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    if (element && !element.open) element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="event-title"
      onClose={e => { if (!e.currentTarget.open) onClose(); }}
      onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className={styles.dialogInner}>
        <button className={`${styles.iconButton} ${styles.close}`} onClick={() => dialog.current?.close()} aria-label="Close event details" title="Close"><Icon name="close-outline" /></button>
        {event.image && <figure className={styles.eventImage}>
          <Image src={event.image} alt={event.imageAlt || event.title} width={900} height={540} sizes="(max-width: 640px) 100vw, 600px" style={{ objectPosition: event.imagePosition }} />
          {event.imageCaption && <figcaption>{event.imageCaption}</figcaption>}
        </figure>}
        <div className={styles.dialogContent}>
          <EventBadge category={event.category} />
          <h2 id="event-title">{event.title}</h2>
          <dl className={styles.facts}>
            <div><dt><Icon name="calendar-outline" />Date</dt><dd>{dateRange(event)}, {event.date.slice(0, 4)}</dd></div>
          </dl>
          <div className={styles.description}>
            {event.description.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
          {event.highlights && <div className={styles.highlights}>
            <p>Highlights</p>
            <ul>{event.highlights.map(item => <li key={item}>{item}</li>)}</ul>
          </div>}
          {event.registrationUrl && <a className={styles.registration} href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register <Icon name="arrow-forward-outline" /></a>}
        </div>
      </div>
    </dialog>
  );
}

export default function EventCalendar() {
  const [month, setMonth] = useState('2026-10');
  const [selectedDay, setSelectedDay] = useState('2026-10-07');
  const [today, setToday] = useState('');
  const [category, setCategory] = useState<EventCategory | 'all'>('all');
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  useEffect(() => {
    const value = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    setToday(value);
    if (value.startsWith('2026-10')) setSelectedDay(value);
  }, []);

  const days = monthDays(month);
  const filtered = calendarEvents.filter(event => category === 'all' || category === event.category);
  const monthEvents = filtered.filter(event => event.date < `${shiftMonth(month, 1)}-01` && (event.endDate || event.date) >= `${month}-01`)
    .sort((a, b) => a.date.localeCompare(b.date));
  const scheduled = monthEvents.filter(event => !event.notice);
  const notices = monthEvents.filter(event => event.notice);
  const dayEvents = scheduled.filter(event => occursOn(event, selectedDay));

  function navigate(offset: number) {
    const next = shiftMonth(month, offset);
    setMonth(next);
    setSelectedDay(`${next}-01`);
  }

  function selectDay(day: string) {
    setSelectedDay(day);
    if (!day.startsWith(month)) setMonth(day.slice(0, 7));
  }

  return (
    <section className={styles.page} aria-labelledby="calendar-heading">
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Events</p>
          <h1 id="calendar-heading">배우고, 만나고,<br /><span>함께하는 이번 달</span></h1>
        </div>
        <div className={styles.heroImage}>
          <EventsGallery heightClassName="min-h-[380px] flex-1 lg:h-[480px] lg:flex-none" />
        </div>
        <a
          href="#event-calendar"
          className={styles.scrollCue}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('event-calendar')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>캘린더 보기</span>
          <Icon name="chevron-down-outline" />
        </a>
      </header>

      <div id="event-calendar" className={`${styles.workspace} ${styles.sectionBreak}`}>
        <div className={styles.calendarColumn}>
          <div className={styles.calendar}>
            <div className={styles.monthBanner}>
              <button className={styles.bannerArrow} onClick={() => navigate(-1)} aria-label="Previous month" title="Previous month"><Icon name="chevron-back-outline" /></button>
              <h2 aria-live="polite">{formatDate(`${month}-01`, { month: 'long', year: 'numeric' })}</h2>
              <button className={styles.bannerArrow} onClick={() => navigate(1)} aria-label="Next month" title="Next month"><Icon name="chevron-forward-outline" /></button>
            </div>
            <div className={styles.weekdays}>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day}>{day}</span>)}</div>
            <div className={styles.days}>
              {days.map((day, dayIndex) => {
                const events = scheduled.filter(event => occursOn(event, day));
                const barEvents = events.filter(isMultiDay);
                const chipEvents = events.filter(event => !isMultiDay(event));
                const weekdayIndex = dayIndex % 7;
                const outside = !day.startsWith(month);
                return <div key={day} className={`${styles.day} ${outside ? styles.outside : ''} ${selectedDay === day ? styles.selected : ''}`}
                  onClick={() => selectDay(day)}
                  aria-label={`${formatDate(day, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}, ${events.length} events`}>
                  <button className={`${styles.dayNumber} ${day === today ? styles.currentDay : ''}`} onClick={() => selectDay(day)} tabIndex={-1}
                    aria-pressed={selectedDay === day} aria-current={day === today ? 'date' : undefined}>
                    {Number(day.slice(-2))}
                    <span className={styles.mobileDots} aria-hidden="true">{events.map(event => <i key={event.id} style={{ background: eventCategories[event.category].color }} />)}</span>
                  </button>
                  {barEvents.length > 0 && <div className={styles.cellBars}>{barEvents.map(event => {
                    const isStart = day === event.date;
                    const isEnd = day === (event.endDate ?? event.date);
                    const roundLeft = isStart || weekdayIndex === 0;
                    const roundRight = isEnd || weekdayIndex === 6;
                    const extendLeft = roundLeft ? 0 : 7;
                    const extendRight = roundRight ? 0 : 7;
                    return <button key={event.id} className={styles.spanBar}
                      style={{
                        color: eventCategories[event.category].color,
                        background: eventCategories[event.category].background,
                        width: `calc(100% + ${extendLeft + extendRight}px)`,
                        marginLeft: extendLeft ? -extendLeft : undefined,
                        borderTopLeftRadius: roundLeft ? undefined : 0,
                        borderBottomLeftRadius: roundLeft ? undefined : 0,
                        borderTopRightRadius: roundRight ? undefined : 0,
                        borderBottomRightRadius: roundRight ? undefined : 0,
                      }}
                      onClick={e => { e.stopPropagation(); setSelectedDay(day); setActiveEvent(event); }} title={event.title}>
                      {isStart || weekdayIndex === 0 ? <><Icon name={eventCategories[event.category].icon} />{event.title}</> : ' '}
                    </button>;
                  })}</div>}
                  <div className={styles.cellEvents}>{chipEvents.map(event => <button key={event.id} className={styles.eventChip}
                    style={{ color: eventCategories[event.category].color, background: eventCategories[event.category].background }}
                    onClick={e => { e.stopPropagation(); setSelectedDay(day); setActiveEvent(event); }} title={event.title}>
                    <Icon name={eventCategories[event.category].icon} />{event.title}
                  </button>)}</div>
                </div>;
              })}
            </div>
          </div>
          <div className={styles.utilityBar}>
            <button className={styles.todayButton} disabled={!today} onClick={() => { setMonth(today.slice(0, 7)); setSelectedDay(today); }}>Today</button>
            <div className={styles.legend} aria-label="Event categories">
              {Object.entries(eventCategories).map(([key, info]) => <span key={key}><i style={{ background: info.color }} />{info.label}</span>)}
            </div>
            <CategoryFilter value={category} onChange={setCategory} />
          </div>
          {notices.map(event => <button key={event.id} className={styles.notice} onClick={() => setActiveEvent(event)}>
            <Icon name="videocam-outline" /><span><strong>{event.title}</strong><small>{dateRange(event)}</small></span><Icon name="arrow-forward-outline" />
          </button>)}
        </div>

        <aside className={styles.agenda} aria-label="Selected day">
          <div className={styles.agendaHeading}><p>{formatDate(selectedDay, { weekday: 'long' })}</p><h3>{formatDate(selectedDay, { month: 'long', day: 'numeric' })}</h3>
            <span>{dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}</span></div>
          <div aria-live="polite">
            {dayEvents.length ? dayEvents.map(event => <button key={event.id} className={styles.agendaEvent} onClick={() => setActiveEvent(event)}>
              {event.image && <div className={styles.agendaImage}><Image src={event.image} alt={event.imageAlt || event.title} width={520} height={320} sizes="(max-width: 767px) 90vw, 280px" style={{ objectPosition: event.imagePosition }} /><span>UTKCC · {eventCategories[event.category].label}</span></div>}
              <EventBadge category={event.category} /><strong>{event.title}</strong><span className={styles.agendaMeta}>{dateRange(event)}</span>
              <span className={styles.detailsLink}>Event details <Icon name="arrow-forward-outline" /></span>
            </button>) : <div className={styles.empty}><Icon name="sunny-outline" /><p>No events on this day.</p></div>}
          </div>
        </aside>
      </div>
      <div className={styles.sectionBreak}>
        <InvitationArchive />
      </div>
      {activeEvent && <EventDetails event={activeEvent} onClose={() => setActiveEvent(null)} />}
    </section>
  );
}
