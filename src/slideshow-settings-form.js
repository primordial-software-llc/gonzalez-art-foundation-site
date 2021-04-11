export default class SlideShowSettingsForm {
    getView() {
        return $(`
            <div class="container">
                <h2>Slideshow Settings</h2>
                <div class="input-form form-group row">
                    <label for="max-results" class="col-sm-2 col-form-label">Number of Screens:</label>
                    <input id="max-results" type="text" class="col-sm-10 form-control" value="100" />
                </div>
            </div>
        `);
    }
}