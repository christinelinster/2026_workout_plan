(() => {
  const storageKey = 'lean-and-strong.workout-view';
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  let saved = {};

  try {
    saved = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    // The URL still restores the view if storage is unavailable.
  }

  function select(button, active) {
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }

  function showView() {
    const route = new URLSearchParams(location.hash.slice(1));
    const tab = tabs.find(button => button.dataset.tab === route.get('tab'))
      ?? tabs.find(button => button.dataset.tab === saved.tab)
      ?? tabs[0];
    const tabId = tab.dataset.tab;
    const panel = panels.find(candidate => candidate.dataset.panel === tabId);
    const days = [...panel.querySelectorAll('[data-day]')];
    const day = days.find(button => button.dataset.day === route.get('day'))
      ?? days.find(button => button.dataset.day === saved.days?.[tabId])
      ?? days[0];

    for (const button of tabs) select(button, button === tab);
    for (const candidate of panels) candidate.hidden = candidate !== panel;
    for (const button of days) select(button, button === day);
    for (const view of panel.querySelectorAll('[data-day-panel]')) {
      view.hidden = view.dataset.dayPanel !== day?.dataset.day;
    }

    saved = { tab: tabId, days: { ...saved.days } };
    if (day) saved.days[tabId] = day.dataset.day;
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      // Storage is optional for file previews and private browsing.
    }
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('button[data-tab], button[data-day]');
    if (!button) return;

    const tabId = button.dataset.tab ?? button.closest('[data-panel]').dataset.panel;
    const route = new URLSearchParams({ tab: tabId });
    const dayId = button.dataset.day ?? saved.days?.[tabId];
    if (dayId) route.set('day', dayId);
    location.hash = route.toString();
    showView();
  });
  window.addEventListener('hashchange', showView);
  showView();
})();
