import { PrismaClient, UnitType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏗️ İnşaat Monitor - Veritabanı Seed İşlemi\n');

  // 1. Bina oluştur
  const building = await prisma.building.create({
    data: {
      name: 'Kadir Apartmanı',
      address: 'İstanbul',
    },
  });
  console.log(`✅ Bina oluşturuldu: ${building.name}`);

  // 2. Katlar oluştur
  const floorsData = [
    { number: 0, label: 'Bodrum' },
    { number: 1, label: '1. Kat' },
    { number: 2, label: '2. Kat' },
    { number: 3, label: '3. Kat' },
    { number: 4, label: '4. Kat' },
  ];

  const floors = await Promise.all(
    floorsData.map((f) =>
      prisma.floor.create({
        data: {
          buildingId: building.id,
          number: f.number,
          label: f.label,
        },
      })
    )
  );
  console.log(`✅ ${floors.length} kat oluşturuldu`);

  // 3. Birimler oluştur
  // Her kat: 2 adet 3+1, 3 adet 2+1
  const unitsData: Array<{
    floorId: string;
    number: string;
    type: UnitType;
    areaSqm: number;
  }> = [];

  floors.forEach((floor) => {
    if (floor.number === 0) {
      // Bodrum - sadece garaj, daire yok
      return;
    }

    // 3+1 birimler (2 adet)
    for (let i = 0; i < 2; i++) {
      unitsData.push({
        floorId: floor.id,
        number: `${floor.number}0${i + 1}`, // 101, 102
        type: UnitType.THREE_PLUS_ONE,
        areaSqm: 120 + Math.random() * 20,
      });
    }

    // 2+1 birimler (3 adet)
    for (let i = 0; i < 3; i++) {
      unitsData.push({
        floorId: floor.id,
        number: `${floor.number}0${i + 3}`, // 103, 104, 105
        type: UnitType.TWO_PLUS_ONE,
        areaSqm: 85 + Math.random() * 15,
      });
    }
  });

  await prisma.unit.createMany({
    data: unitsData,
  });
  console.log(`✅ ${unitsData.length} birim oluşturuldu`);

  // 4. Örnek iş kalemleri
  const workItemsData = [
    // Kaba İşler
    { category: 'Kaba İşler', name: 'Temel kazısı', status: 'DONE' },
    { category: 'Kaba İşler', name: 'Temel betonu', status: 'DONE' },
    { category: 'Kaba İşler', name: 'Kolonkiriye', status: 'IN_PROGRESS' },
    { category: 'Kaba İşler', name: 'Duvarlar', status: 'TODO' },
    
    // Tesisat
    { category: 'Tesisat', name: 'Elektrik tesisatı', status: 'TODO' },
    { category: 'Tesisat', name: 'Su tesisatı', status: 'TODO' },
    { category: 'Tesisat', name: 'Doğalgaz tesisatı', status: 'TODO' },
    
    // İç Cephe
    { category: 'İç Cephe', name: 'Alçı sıva', status: 'TODO' },
    { category: 'İç Cephe', name: 'Boyama', status: 'TODO' },
    { category: 'İç Cephe', name: 'Seramik', status: 'TODO' },
    
    // Dış Cephe
    { category: 'Dış Cephe', name: 'Mantolama', status: 'TODO' },
    { category: 'Dış Cephe', name: 'Dış boya', status: 'TODO' },
    
    // Kapı/Pencere
    { category: 'Kapı/Pencere', name: 'PVC pencere montajı', status: 'TODO' },
    { category: 'Kapı/Pencere', name: 'Çelik kapı montajı', status: 'TODO' },
  ];

  // Tüm birimlere iş kalemlerini ekle
  const units = await prisma.unit.findMany();
  
  for (const unit of units) {
    for (const item of workItemsData) {
      await prisma.workItem.create({
        data: {
          unitId: unit.id,
          floorId: unit.floorId,
          category: item.category,
          name: item.name,
          status: item.status as any,
          priority: 'MEDIUM',
        },
      });
    }
  }
  console.log(`✅ ${units.length * workItemsData.length} iş kalemi oluşturuldu`);

  console.log('\n🎉 Seed işlemi tamamlandı!');
  console.log('\n📊 Özet:');
  console.log(`   - 1 bina`);
  console.log(`   - ${floors.length} kat`);
  console.log(`   - ${unitsData.length} birim`);
  console.log(`   - ${unitsData.length * workItemsData.length} iş kalemi`);
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
