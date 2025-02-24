document.addEventListener('alpine:init', () => {
    Alpine.data('datepicker', (model, packageConfig,attribs) => ({
        state: model,
        mode: 'light',
        attribs: attribs,
        fp: null,
        get darkStatus() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        },
        init() {

            this.mode = localStorage.getItem('theme') || (this.darkStatus ? 'dark' : 'light')
            const config = {
                mode: attribs.mode,
                time_24hr: true,
                altFormat: attribs.altFormat,
                disable: attribs.disabledDates,
                disableMobile: true,
                minDate: 'today',
                initialDate: this.state,
                allowInvalidPreload: true,
                static: false,
                defaultDate: this.state,
                ...packageConfig,
            };
            if (attribs.monthSelect) {
                config.plugins.push(new monthSelectPlugin({
                    shorthand: false, //defaults to false
                    dateFormat: "Y-m-01", //defaults to "F Y"
                    altInput: true,
                    altFormat: "F, Y", //defaults to "F Y"
                    theme: this.mode // defaults to "light"
                }))
            } else if(attribs.weekSelect) {
                config.plugins.push(new weekSelect({}))
            }
            this.fp = flatpickr(this.$refs.picker, config);
            this.fp.parseDate(this.state,packageConfig.dateFormat)
        }
    }))
})
