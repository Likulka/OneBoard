<template>
  <div class="editor-container" id="writingSpace">
    <div class="editor" @scroll="onScroll" ref="editor">
      <div class="spacer" :style="{ height: spacerHeight + 'px' }"></div>
      <div class="lines">
        <div
            v-for="line in visibleLines"
            :key="line.number"
            class="line"
        >
          <div class="line-number">{{ line.number }}</div>
          <input
              type="text"
              v-model="line.text"
              class="line-input"
          />
        </div>
      </div>
      <div class="spacer" :style="{ height: spacerHeight + 'px' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfiniteEditor',
  data() {
    return {
      visibleLines: [],
      lineHeight: 30,
      bufferSize: 800,
      spacerHeight: 0,
      totalLines: 0,
    };
  },
  methods: {
    initialize() {
      const startLine = -Math.floor(this.bufferSize / 2) - 100; // Добавили 100 дополнительных строк сверху
      const endLine = Math.floor(this.bufferSize / 2) + 100;    // И 100 строк снизу

      this.visibleLines = [];
      for (let i = startLine; i <= endLine; i++) {
        this.visibleLines.push({
          number: i,
          text: '',
        });
      }

      this.totalLines = this.visibleLines.length;
      this.updateSpacerHeight();

      this.$nextTick(() => {
        const editor = this.$refs.editor;
        if (editor) {
          const lineZeroIndex = this.visibleLines.findIndex(line => line.number === 0);
          editor.scrollTop = lineZeroIndex * this.lineHeight - editor.clientHeight / 2;
        }
      });
    },
    onScroll() {
      const editor = this.$refs.editor;
      if (!editor) return;
      const scrollTop = editor.scrollTop;

      if (scrollTop < this.lineHeight * 50) {
        this.addLinesToTop(50); // Добавляем 50 строк при приближении к верхней границе
      }

      if (scrollTop + editor.clientHeight > editor.scrollHeight - this.lineHeight * 50) {
        this.addLinesToBottom(50); // Добавляем 50 строк при приближении к нижней границе
      }
    },
    addLinesToTop(count) {
      let firstLineNumber = this.visibleLines[0].number;
      for (let i = 1; i <= count; i++) {
        firstLineNumber--;
        this.visibleLines.unshift({
          number: firstLineNumber,
          text: '',
        });
      }
      this.totalLines += count;
      this.updateSpacerHeight();

      const editor = this.$refs.editor;
      editor.scrollTop += count * this.lineHeight;
    },
    addLinesToBottom(count) {
      let lastLineNumber = this.visibleLines[this.visibleLines.length - 1].number;
      for (let i = 1; i <= count; i++) {
        lastLineNumber++;
        this.visibleLines.push({
          number: lastLineNumber,
          text: '',
        });
      }
      this.totalLines += count;
      this.updateSpacerHeight();
    },
    updateSpacerHeight() {
      this.spacerHeight = (this.totalLines - this.visibleLines.length) * this.lineHeight / 2;
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>

<style scoped>
.editor-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.editor {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f6e5d5;
  color: #2a2e33;
  font-family: 'Courier New', Courier, monospace;
}

.lines {
  display: flex;
  flex-direction: column;
}

.line {
  display: flex;
  align-items: center;
  height: 30px;
}

.line-number {
  width: 50px;
  text-align: right;
  padding-right: 10px;
  color: #5c6370;
  user-select: none;
}

.line-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: inherit;
  outline: none;
  font-family: inherit;
  font-size: 16px;
}

.spacer {
  width: 100%;
}
</style>
