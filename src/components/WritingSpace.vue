<template>
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
</template>

<script>
export default {
  data() {
    return {
      visibleLines: [], // Видимые линии
      lineHeight: 30, // Высота одной линии в пикселях
      bufferSize: 20, // Количество линий, отображаемых одновременно
      spacerHeight: 0, // Высота верхнего и нижнего отступов
      totalLines: 0, // Общее количество линий сверху и снизу
    };
  },
  methods: {
    initialize() {
      // Начальные линии
      const startLine = -Math.floor(this.bufferSize / 2);
      const endLine = Math.floor(this.bufferSize / 2);

      this.visibleLines = [];
      for (let i = startLine; i <= endLine; i++) {
        this.visibleLines.push({
          number: i,
          text: '',
        });
      }

      // Устанавливаем высоту отступов
      this.totalLines = 0;
      this.updateSpacerHeight();

      // Устанавливаем начальную позицию прокрутки
      this.$nextTick(() => {
        const editor = this.$refs.editor;
        editor.scrollTop = editor.scrollHeight / 2 - editor.clientHeight / 2;
      });
    },
    onScroll() {
      const editor = this.$refs.editor;
      const scrollTop = editor.scrollTop;

      // Если прокручено почти до верха
      if (scrollTop < this.lineHeight * 5) {
        this.addLinesToTop(10);
      }

      // Если прокручено почти до низа
      if (scrollTop + editor.clientHeight > editor.scrollHeight - this.lineHeight * 5) {
        this.addLinesToBottom(10);
      }
    },
    addLinesToTop(count) {
      const firstLineNumber = this.visibleLines[0].number;
      for (let i = 1; i <= count; i++) {
        this.visibleLines.unshift({
          number: firstLineNumber - i,
          text: '',
        });
      }
      this.totalLines += count;
      this.updateSpacerHeight();

      // Сохраняем позицию прокрутки
      const editor = this.$refs.editor;
      editor.scrollTop += count * this.lineHeight;
    },
    addLinesToBottom(count) {
      const lastLineNumber = this.visibleLines[this.visibleLines.length - 1].number;
      for (let i = 1; i <= count; i++) {
        this.visibleLines.push({
          number: lastLineNumber + i,
          text: '',
        });
      }
      this.totalLines += count;
      this.updateSpacerHeight();
    },
    updateSpacerHeight() {
      // Обновляем высоту отступов
      this.spacerHeight = this.totalLines * this.lineHeight;
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>

<style scoped>
.editor {
  height: 500px;
  overflow-y: scroll;
  background-color: #282c34;
  color: #abb2bf;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
}

.lines {
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
