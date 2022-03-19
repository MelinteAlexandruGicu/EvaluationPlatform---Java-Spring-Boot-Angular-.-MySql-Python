import sys

from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QMainWindow, QApplication

from interface import Ui_MainWindow


class MainWindow(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.ui.loginButtonHomePage.clicked.connect(lambda: self.ui.stackedWidget.setCurrentWidget(self.ui.loginPage))
        self.ui.registerButtonHomePage.clicked.connect(lambda: self.ui.stackedWidget.setCurrentWidget(self.ui.registerPage))
        self.ui.loginButtonLoginPage.clicked.connect(lambda: self.ui.stackedWidget.setCurrentWidget(self.ui.dashboardPage))
        self.ui.regsiterButton.clicked.connect(lambda: self.ui.stackedWidget.setCurrentWidget(self.ui.dashboardPage))
        self.ui.logginButtonRegisterPage.clicked.connect(lambda: self.ui.stackedWidget.setCurrentWidget(self.ui.loginPage))
        self.ui.registerButtonLoginPage.clicked.connect(lambda: self.ui.stackedWidget.setCurrentWidget(self.ui.registerPage))
        self.ui.backButton.clicked.connect(lambda: self.ui.stackedWidget.setCurrentWidget(self.ui.homePage))
        self.setWindowIcon(QIcon("test.png"))

        self.show()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    with open("style.qss", "r") as f:
        _style = f.read()
        app.setStyleSheet(_style)
    window = MainWindow()
    sys.exit(app.exec_())
