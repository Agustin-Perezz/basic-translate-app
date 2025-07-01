<script>
  import { client } from '$lib/openia-config';

  let input = '';
  let translation = '';

  const handleTranslate = async () => {
    const response = await client.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: 'You are a translation assistant.' },
        {
          role: 'user',
          content: `Translate the following text to English: ${input}`
        }
      ]
    });
    translation = response.choices[0].message.content || '';
  };
</script>

<div
  class="flex min-h-screen flex-col items-center justify-center bg-gray-900 py-12 font-[Quicksand]"
>
  <h1 class="mb-10 text-4xl text-white">AI-Powered Translation Assistant</h1>

  <div class="flex w-full max-w-5xl gap-2">
    <div
      class="flex flex-1 flex-col rounded-md border border-gray-600 bg-transparent p-4 shadow-md"
    >
      <textarea
        bind:value={input}
        rows="4"
        class="w-full resize-none border-none bg-transparent text-lg text-white outline-none focus:ring-0 focus:outline-none"
        placeholder="Enter text"
      ></textarea>
      <div class="mt-1 flex items-center justify-between">
        <span class="text-xs text-gray-500">{input.length} / 1000</span>
        <button
          on:click={handleTranslate}
          class="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Translate
        </button>
      </div>
    </div>
    <div
      class="flex flex-1 flex-col rounded-md border border-gray-600 bg-transparent p-4 shadow"
    >
      <div class="mb-1 text-lg font-semibold text-white">Translation</div>
      <div class="flex-1 text-lg whitespace-pre-wrap text-white">
        {translation}
      </div>
    </div>
  </div>
</div>
