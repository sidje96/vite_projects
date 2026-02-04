<template>
    <div class="wrapper">
        <div class="card">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>tools</title>
                <path d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z" />
            </svg>
            <h1>active task</h1>
        </div>
        <div class="card">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>magnify</title>
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            <h1>Search</h1>
        </div>
        <div class="card">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>information</title>
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            <h1>Information</h1>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    background: var(--vt-c-currentColor)
}

.wrapper svg {
    width: 160px;
    height: 160px;
}

.card {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.card:hover {
    background: var(--vt-c-currentColor-hover);
    cursor: pointer;
    > * {
        fill: black;
        color: black;
    }
}

</style>