<script setup lang="ts">
import { ref } from 'vue';
import { TextEditor } from '../src/index';

const content = ref('');

async function uploadImage(file: File): Promise<string> {
  // Convert to data URL for demo (in production, upload to server)
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
}

function handleError(message: string) {
  console.error('Editor error:', message);
  alert(message);
}

function resetEditor() {
  content.value = '';
}

function copyHtml() {
  navigator.clipboard.writeText(content.value);
  alert('HTML copied to clipboard!');
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-header">
      <h1>✍️ Simple TipTap Text Editor</h1>
      <p style="text-shadow: 0 0 5px black">Rich text editing made simple for Vue 3</p>
    </div>

    <div class="demo-wrapper">
      <!-- Example 1: Basic Usage -->
      <section class="demo-section">
        <h2>Basic Editor</h2>
        <div class="demo-card">
          <TextEditor
            v-model="content"
            label="Content"
            placeholder="Write something amazing..."
            :required="true"
            :upload-image="uploadImage"
            @error="handleError"
          />

          <div class="demo-actions">
            <button class="btn btn-secondary" @click="resetEditor">Reset</button>
            <button v-if="content" class="btn btn-primary" @click="copyHtml">Copy HTML</button>
          </div>

          <div v-if="content" class="demo-output">
            <h3>HTML Output</h3>
            <pre>{{ content }}</pre>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="demo-section">
        <h2>Features</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">📝</div>
            <h3>Rich Text</h3>
            <p>Bold, italic, underline, strikethrough and more</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📸</div>
            <h3>Media</h3>
            <p>Upload images and embed YouTube videos</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📊</div>
            <h3>Tables</h3>
            <p>Create and manage tables with ease</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🎨</div>
            <h3>Styling</h3>
            <p>Font family, size, colors, and alignment</p>
          </div>
          <div class="feature">
            <div class="feature-icon">⛔</div>
            <h3>Fullscreen</h3>
            <p>Edit in fullscreen or view HTML source</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔤</div>
            <h3>Typography</h3>
            <p>Text case transformations (uppercase, snake_case, etc.)</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.demo-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.demo-header {
  text-align: center;
  margin-bottom: 50px;
  color: white;
}

.demo-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.demo-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.demo-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  font-size: 1.8rem;
  color: #111827;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid #3b82f6;
  display: inline-block;
}

.demo-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #111827;
  font-size: 0.95rem;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #d4d4d8;
  border-radius: 8px;
  font-size: 0.95rem;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.demo-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.demo-output {
  margin-top: 20px;
  padding: 15px;
  background: #f8fafc;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
}

.demo-output h3 {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 10px;
  font-weight: 600;
}

.demo-output pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
  max-height: 300px;
  overflow-y: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.feature {
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.feature h3 {
  font-size: 1.1rem;
  color: #111827;
  margin-bottom: 8px;
}

.feature p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .demo-header h1 {
    font-size: 2rem;
  }

  .demo-card {
    padding: 20px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
