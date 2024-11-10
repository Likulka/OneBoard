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
              placeholder="..."
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
      const startLine = -Math.floor(this.bufferSize / 2) - 100;
      const endLine = Math.floor(this.bufferSize / 2) + 100;

      this.visibleLines = [];
      for (let i = startLine; i <= endLine; i++) {
        this.visibleLines.push({
          number: i,
          text: this.getInitialText(i),
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
    getInitialText(lineNumber) {
      if (lineNumber === 0) return "Это бесконечный ";
      if (lineNumber === 1) return "блокнот.";
      if (lineNumber === 2) return "Можешь писать вверх";
      if (lineNumber === 3) return "или вниз.";
      if (lineNumber === 4) return "Закладки создадутся";
      if (lineNumber === 5) return "автоматически!";
      return '';
    },
    onScroll() {
      const editor = this.$refs.editor;
      if (!editor) return;
      const scrollTop = editor.scrollTop;

      if (scrollTop < this.lineHeight * 50) {
        this.addLinesToTop(50);
      }

      if (scrollTop + editor.clientHeight > editor.scrollHeight - this.lineHeight * 50) {
        this.addLinesToBottom(50);
      }
    },
    addLinesToTop(count) {
      let firstLineNumber = this.visibleLines[0].number;
      for (let i = 1; i <= count; i++) {
        firstLineNumber--;
        this.visibleLines.unshift({
          number: firstLineNumber,
          text: this.getInitialText(firstLineNumber),
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
          text: this.getInitialText(lastLineNumber),
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
  background-color: #fdfbdd;
  border: 1px solid #e2d3b5;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.editor {
  flex-grow: 1;
  overflow-y: auto;
  color: #2a2e33;
  font-family: 'Courier New', Courier, monospace;
  padding: 10px;
}

.lines {
  display: flex;
  flex-direction: column;
}

.line {
  display: flex;
  align-items: center;
  height: 30px;
  border-bottom: 1px dashed #fde7c2;
}

.line-number {
  width: 50px;
  text-align: right;
  padding-right: 10px;
  color: #b9a783;
  background-color: #fdf3e2;
  user-select: none;
  font-weight: bold;
}

.line-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: #2a2e33;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  padding: 5px 0;
}

.line-input::placeholder {
  color: #d3c6a7;
}

.spacer {
  width: 100%;
}
</style>
