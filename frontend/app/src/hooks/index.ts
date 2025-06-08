/**
 * テキスト内の「。」の後に改行コードを挿入する関数
 * @param text - 処理対象のテキスト
 * @returns 「。」の後に改行コードが挿入されたテキスト
 */
export function addNewlineAfterPeriod(text: string): string {
  if (!text) return text;
  // 「。」の後に改行コードを挿入（既に改行がある場合は重複を避ける）
  return text.replace(/。(?!\n)/g, '。\n');
}
