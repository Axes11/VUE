const App = {
    data() {
        return {
            title: "Vue Stepper",
            currentStep: 0,
            steppersDescriptions: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum lacus sem. Quisque tortor ante, molestie vitae lacus et, vestibulum semper magna. Donec eu vulputate mauris, quis viverra nibh. Pellentesque rutrum placerat tincidunt. Curabitur ut velit vitae eros lobortis aliquam nec euismod est.",
                "In ac facilisis magna. Curabitur ac commodo turpis. Quisque vel porttitor odio. Morbi scelerisque porttitor urna, id suscipit sapien maximus a. Suspendisse rutrum aliquet blandit.",
                "Phasellus congue, nulla eget commodo tempor, sem erat semper mauris, vel luctus lectus ante sed nulla. In gravida libero nec dui viverra, in vulputate quam ultricies. In hac habitasse platea dictumst. Mauris pellentesque velit ligula, ac suscipit dui sagittis quis. Sed scelerisque enim nec sem hendrerit, ut consequat magna gravida.",
                "Phasellus congue, nulla eget commodo tempor, sem erat semper mauris, vel luctus lectus ante sed nulla. In gravida libero nec dui viverra, in vulputate quam ultricies. In hac habitasse platea dictumst. Mauris pellentesque velit ligula, ac suscipit dui sagittis quis. Sed scelerisque enim nec sem hendrerit, ut consequat magna gravida.",
                "Phasellus congue, nulla eget commodo tempor, sem erat semper mauris, vel luctus lectus ante sed nulla. In gravida libero nec dui viverra, in vulputate quam ultricies. In hac habitasse platea dictumst. Mauris pellentesque velit ligula, ac suscipit dui sagittis quis. Sed scelerisque enim nec sem hendrerit, ut consequat magna gravida.",
                "Curabitur sed tincidunt ligula. Nam ornare dui ac magna sagittis fermentum. Aenean vestibulum odio ac efficitur scelerisque. Aliquam erat volutpat. Phasellus elementum id est viverra vestibulum. Vivamus lobortis at leo at condimentum. Donec sagittis semper erat, quis feugiat magna lobortis vitae. Sed vitae convallis lacus, faucibus varius dolor"
            ],
            beforeBtnDisabled: false
        }
    },
    methods: {
        nextStep(){
            this.currentStep += 1;
        },
        beforeStep(){
            if(this.currentStep <= 0){
                this.beforeBtnUnDisabled = false;
            }else{
                this.currentStep -= 1;
            }
        },
        keyPressed(event) {
            if (event.key === 'ArrowRight') {
                this.nextStep();
            } else if (event.key === 'ArrowLeft') {
                this.beforeStep();
            }
        },
        returnToStart(){
            this.currentStep = 0;
        },
        selectStep(index){
            this.currentStep = index;
        }
    },
    mounted() {
        window.addEventListener('keyup', this.keyPressed);
    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.keyPressed);
    }
}

Vue.createApp(App).mount("#app")
