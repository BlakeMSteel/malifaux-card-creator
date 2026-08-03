type Editable = HTMLInputElement | HTMLTextAreaElement;

function isEditable(el: Element | null): el is Editable {
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
}

export function insertAtCursor(token: string) {
  const el = document.activeElement;
  if (!isEditable(el)) return;

  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  const newValue = el.value.slice(0, start) + token + el.value.slice(end);

  const proto =
    el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter?.call(el, newValue);
  el.dispatchEvent(new Event("input", { bubbles: true }));

  const cursor = start + token.length;
  requestAnimationFrame(() => {
    el.focus();
    el.setSelectionRange(cursor, cursor);
  });
}
