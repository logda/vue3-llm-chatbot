<template>
    <div class="wrapper">
        <h1 class="heading">LLM Chat Bot</h1>
        <div class="messages">
            <div
                v-for="(message, index) in messages"
                :key="index"
            >
                <div
                    :class="message.from == 'user' ? 'user-message--wrapper' : 'bot-message--wrapper'"
                >
                    <div
                        :class="message.from == 'user' ? 'user-message--content' : 'bot-message--content'"
                    >{{ message.data }}</div>
                </div>
            </div>
            <div
                v-if="messageLoading"
                class="message-loading"
            >Loading...</div>
        </div>
        <div class="footer">
            <input
                v-model="currentMessage"
                type="text"
                class="input-field"
                placeholder="Ask me something."
            />
            <button
                @click="submitMessage(currentMessage)"
                class="button"
            >Send</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const currentMessage = ref('')
const messageLoading = ref(false)
const messages = ref([])

async function submitMessage(newMessage) {
    await addToMessageArray('user', newMessage)
    this.messageLoading = true;

    await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: newMessage })
        })
        .then(response => response.json())
        .then((response) => {
            if (response) {
                // addToMessageArray('chatGpt', response.data)
                addToMessageArray('chatGpt', response.response.kwargs.content)
                updateMessageStatus('success')
            }

            updateMessageStatus()
        });
}

function addToMessageArray(from, data) {
    messages.value.push({
        from,
        data
    });
}

function updateMessageStatus(status) {
    if (status === 'success') {
        currentMessage.value = ''
    }

    messageLoading.value = false;
}
</script>

<style scoped>
.heading,
.user-message--content,
.footer {
    background-color: #0098e0;
}

.heading,
.footer,
.messages {
    padding: 1rem;
}

.bot-message--wrapper,
.user-message--wrapper {
    display: flex;
}

.user-message--wrapper {
    justify-content: flex-end;
}

.bot-message--wrapper {
    justify-content: flex-start;
}

.bot-message--content,
.message-loading,
.user-message--content {
    border-radius: 1rem;
    margin-bottom: 1rem;
    max-width: 70%;
    padding: 1rem;
    white-space: break-spaces;
    width: fit-content;
}

.bot-message--content {
    background-color: #323232;
    color: white;
}

.bot-message--content,
.heading,
.user-message--content {
    color: #fefefe;
}

.message-loading {
    background-color: #e8e8e8;
    color: #323232;
}

.messages {
    margin-bottom: 5rem;
}

.footer {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.footer .input-field {
    flex: 1;
}

.footer .button {
    padding: 0.5rem 1rem;
}
</style>
