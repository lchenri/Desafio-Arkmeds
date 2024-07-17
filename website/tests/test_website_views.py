from django.test import TestCase
from django.urls import reverse


class WebsiteViewsTest(TestCase):

    def test_website_home_loads_correct_template(self):
        response = self.client.get(reverse('website:home'))
        self.assertTemplateUsed(response, 'website/pages/home.html')

    def test_website_add_equipamento_loads_correct_template(self):
        response = self.client.get(reverse('website:add_equipamento'))
        self.assertTemplateUsed(response, 'website/pages/add_equipamento.html')

    def test_website_edit_equipamento_loads_correct_template(self):
        response = self.client.get(reverse('website:edit_equipamento', kwargs={'pk': 1}))
        self.assertTemplateUsed(response, 'website/pages/edit_equipamento.html')
