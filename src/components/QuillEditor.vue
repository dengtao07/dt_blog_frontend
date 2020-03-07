<template>
	<div class="body">
		<div class="quill-container">
			<quill-editor
				v-model="content"
				ref="myQuillEditor"
				:options="editorOption"
				@blur="onEditorBlur($event)"
				@focus="onEditorFocus($event)"
				@ready="onEditorReady($event)"
				@change="onEditorChange($event)"
			></quill-editor>
			<el-button type="primary" @click="saveEditorContent">保存</el-button>
		</div>
	</div>
</template>

<script>
import Quill from 'quill';
export default {
	name: 'articleComponent',
	data() {
		return {
			content:
				'<ul><li><sub><span class="ql-cursor"></span></sub>I am content!</li></ul>',
			editorOption: {}
		};
	},
	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill;
		}
	},
	methods: {
		onEditorBlur(quill) {
			console.log('editor blur!', quill);
		},
		onEditorFocus(quill) {
			console.log('editor focus!', quill);
		},
		onEditorReady(quill) {
			console.log('editor ready!', quill);
		},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text);
			this.content = html;
		},
		saveEditorContent() {
			console.log(this.editor.root.innerHTML);
		}
	}
};
</script>

<style scoped lang="scss">
.body {
	display: flex;
	justify-content: center;
	.quill-container {
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		padding: 20px;
	}
}
</style>
