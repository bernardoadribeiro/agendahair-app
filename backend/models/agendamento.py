from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

from app import db

class Agendamento(db.Model, SerializerMixin):
    """ Tabela de Agendamentos realizados
    """

    id = db.Column(db.Integer, primary_key=True)
    criado_em = db.Column(db.DateTime(timezone=True), default=func.now())
    atualizado_em = db.Column(db.DateTime(timezone=True), default=func.now())
    code = db.Column(db.String(6), nullable=False)
    nome_cliente = db.Column(db.String, nullable=False) # No futuro ele pode se tornar uma entidade do sistema
    data_agendamento = db.Column(db.Date, nullable=False)    
    horario_inicio = db.Column(db.Time, nullable=False)
    horario_fim = db.Column(db.Time, nullable=False)
    status = db.Column(db.String, nullable=False)
    servicos_desejados = db.Column(db.String)
    observacoes = db.Column(db.String)
